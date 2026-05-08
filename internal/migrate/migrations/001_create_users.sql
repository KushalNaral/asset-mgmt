-- +goose Up
CREATE TABLE IF NOT EXISTS users (
    id            TEXT PRIMARY KEY,
    email         TEXT UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    first_name    TEXT NOT NULL,
    last_name     TEXT NOT NULL,
    role          TEXT NOT NULL DEFAULT 'user',
    is_active     INTEGER NOT NULL DEFAULT 1,
    last_login_at DATETIME,
    created_at    DATETIME NOT NULL,
    updated_at    DATETIME NOT NULL
);

-- +goose Down
DROP TABLE IF EXISTS users;
