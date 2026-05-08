package config

import (
	"fmt"
	"strings"

	"github.com/spf13/viper"
)

// Config holds all application configuration.
type Config struct {
	App   AppConfig
	Redis RedisConfig
	Database DatabaseConfig
}

// AppConfig holds app-level configuration.
type AppConfig struct {
	Name string
	Env  string
	Port int
}

// DatabaseConfig holds database connection configuration.
type DatabaseConfig struct {
	URL string
}

// RedisConfig holds Redis connection configuration.
type RedisConfig struct {
	Addr     string
	Password string
	DB       int
}

// Load reads configuration from environment variables and optional .env file.
func Load() (*Config, error) {
	v := viper.New()

	// Read .env file (not fatal if missing)
	v.SetConfigFile(".env")
	v.SetConfigType("dotenv")
	_ = v.ReadInConfig()

	// Environment variable settings
	v.AutomaticEnv()
	v.SetEnvKeyReplacer(strings.NewReplacer(".", "_"))

	// Defaults
	v.SetDefault("app.name", "asset-mgmt")
	v.SetDefault("app.env", "development")
	v.SetDefault("app.port", 8080)

	v.SetDefault("redis.addr", "localhost:6379")
	v.SetDefault("redis.password", "")
	v.SetDefault("redis.db", 0)

	v.SetDefault("database.url", "")


	cfg := &Config{
		App: AppConfig{
			Name: v.GetString("APP_NAME"),
			Env:  v.GetString("APP_ENV"),
			Port: v.GetInt("APP_PORT"),
		},

		Redis: RedisConfig{
			Addr:     v.GetString("REDIS_ADDR"),
			Password: v.GetString("REDIS_PASSWORD"),
			DB:       v.GetInt("REDIS_DB"),
		},

		Database: DatabaseConfig{
			URL: v.GetString("DATABASE_URL"),
		},

	}

	// Apply viper defaults if env vars are empty
	if cfg.App.Name == "" {
		cfg.App.Name = v.GetString("app.name")
	}
	if cfg.App.Env == "" {
		cfg.App.Env = v.GetString("app.env")
	}
	if cfg.App.Port == 0 {
		cfg.App.Port = v.GetInt("app.port")
	}

	if err := cfg.validate(); err != nil {
		return nil, err
	}

	return cfg, nil
}

func (c *Config) validate() error {
	if c.App.Port < 1 || c.App.Port > 65535 {
		return fmt.Errorf("invalid port: %d (must be 1-65535)", c.App.Port)
	}
	return nil
}
