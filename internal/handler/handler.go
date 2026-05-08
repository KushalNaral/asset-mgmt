package handler

import (
	"encoding/json"
	"net/http"

	"github.com/KushalNaral/asset-mgmt/internal/config"
)

// Handler holds application dependencies.
type Handler struct {
	cfg *config.Config
}

// New creates a new Handler.
func New(cfg *config.Config) *Handler {
	return &Handler{cfg: cfg}
}

// healthResponse is the health check response body.
type healthResponse struct {
	Status string `json:"status"`
	App    string `json:"app"`
	Env    string `json:"env"`
}

// Health godoc
// @Summary     Health check
// @Description Returns service health status
// @Tags        health
// @Produce     json
// @Success     200  {object}  healthResponse
// @Router      /health [get]
func (h *Handler) Health(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	_ = json.NewEncoder(w).Encode(healthResponse{
		Status: "ok",
		App:    h.cfg.App.Name,
		Env:    h.cfg.App.Env,
	})
}

