package migrate

import (
	"embed"
	"fmt"

	"github.com/pressly/goose/v3"

	"github.com/KushalNaral/asset-mgmt/pkg/db"
)

//go:embed migrations/*.sql
var migrations embed.FS

func Run(database *db.DB) error {
	goose.SetBaseFS(migrations)

	if err := goose.SetDialect("sqlite3"); err != nil {
		return fmt.Errorf("migrate: set dialect: %w", err)
	}

	if err := goose.Up(database.SQL(), "migrations"); err != nil {
		return fmt.Errorf("migrate: up: %w", err)
	}

	return nil
}
