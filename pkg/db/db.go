package db

import (
	"context"
	"database/sql"
	"fmt"
	"time"

	_ "modernc.org/sqlite"
)

// DB wraps the standard *sql.DB for SQLite.
type DB struct {
	sql *sql.DB
}

// New opens a SQLite database file and pings it.
func New(path string) (*DB, error) {
	sqlDB, err := sql.Open("sqlite", path)
	if err != nil {
		return nil, fmt.Errorf("db: open: %w", err)
	}

	// SQLite performs best with a single writer connection.
	sqlDB.SetMaxOpenConns(1)
	sqlDB.SetConnMaxLifetime(0)

	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()

	if err := sqlDB.PingContext(ctx); err != nil {
		_ = sqlDB.Close()
		return nil, fmt.Errorf("db: ping: %w", err)
	}

	return &DB{sql: sqlDB}, nil
}

// SQL returns the underlying *sql.DB for raw query access.
func (d *DB) SQL() *sql.DB { return d.sql }

// Close closes the database file.
func (d *DB) Close() error { return d.sql.Close() }
