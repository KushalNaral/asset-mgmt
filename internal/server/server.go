package server

import (
	"context"
	"encoding/json"
	"fmt"
	"io/fs"
	"log/slog"
	"net/http"
	"strings"
	"time"

	"github.com/go-chi/chi/v5"
	"github.com/go-chi/chi/v5/middleware"

	"github.com/KushalNaral/asset-mgmt/internal/config"
	"github.com/KushalNaral/asset-mgmt/internal/handler"
	"github.com/KushalNaral/asset-mgmt/internal/ui"
)

// Server holds the HTTP server and dependencies.
type Server struct {
	cfg    *config.Config
	logger *slog.Logger
	router chi.Router
}

// New creates a new Server.
func New(cfg *config.Config, logger *slog.Logger) *Server {
	r := chi.NewRouter()
	r.Use(middleware.RequestID)
	r.Use(middleware.RealIP)
	r.Use(middleware.Recoverer)
	r.Use(slogMiddleware(logger))

	s := &Server{cfg: cfg, logger: logger, router: r}
	s.registerRoutes()
	return s
}

func (s *Server) registerRoutes() {
	h := handler.New(s.cfg)

	s.router.Get("/health", h.Health)
	s.router.Route("/api/v1", func(r chi.Router) {
		// add your routes here
		_ = json.NewEncoder
	})

	webDist, err := fs.Sub(ui.FS, "dist")
	if err != nil {
		s.logger.Error("failed to create web distribution filesystem", "error", err)
		return
	}
	s.router.Handle("/*", spaHandler(webDist))
}

// Start starts the HTTP server and blocks until ctx is cancelled.
func (s *Server) Start(ctx context.Context) error {
	httpSrv := &http.Server{
		Addr:         fmt.Sprintf(":%d", s.cfg.App.Port),
		Handler:      s.router,
		ReadTimeout:  15 * time.Second,
		WriteTimeout: 15 * time.Second,
		IdleTimeout:  60 * time.Second,
	}

	errCh := make(chan error, 1)
	go func() {
		s.logger.Info("server listening", "port", s.cfg.App.Port)
		if err := httpSrv.ListenAndServe(); err != nil && err != http.ErrServerClosed {
			errCh <- err
		}
		close(errCh)
	}()

	select {
	case <-ctx.Done():
		s.logger.Info("shutting down server...")
		shutdownCtx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
		defer cancel()
		return httpSrv.Shutdown(shutdownCtx)
	case err := <-errCh:
		return err
	}
}

func slogMiddleware(logger *slog.Logger) func(http.Handler) http.Handler {
	return func(next http.Handler) http.Handler {
		return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
			start := time.Now()
			ww := middleware.NewWrapResponseWriter(w, r.ProtoMajor)
			next.ServeHTTP(ww, r)
			logger.Info("request",
				"method", r.Method,
				"path", r.URL.Path,
				"status", ww.Status(),
				"latency", time.Since(start).String(),
				"request_id", middleware.GetReqID(r.Context()),
			)
		})
	}
}

// spaHandler serves the SPA index.html for any non-API routes.
func spaHandler(fsys fs.FS) http.Handler {
	fileServer := http.FileServer(http.FS(fsys))

	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		path := strings.TrimPrefix(r.URL.Path, "/")

		// If root, serve index.html
		if path == "" {
			http.ServeFileFS(w, r, fsys, "index.html")
			return
		}

		// Check if file exists
		if _, err := fs.Stat(fsys, path); err != nil {
			// Not a real file → SPA route
			http.ServeFileFS(w, r, fsys, "index.html")
			return
		}

		// Real file → serve normally
		fileServer.ServeHTTP(w, r)
	})
}
