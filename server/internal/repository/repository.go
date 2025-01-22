package repository

import (
	"context"
	"time"
)

type User struct {
	ID        string
	Email     string
	Password  string
	CreatedAt time.Time
	UpdatedAt time.Time
}

type Repository interface {
	// User operations
	CreateUser(ctx context.Context, email, password string) (*User, error)
	GetUserByID(ctx context.Context, id string) (*User, error)
	GetUserByEmail(ctx context.Context, email string) (*User, error)
	UpdateUser(ctx context.Context, id string, updates map[string]interface{}) error
	DeleteUser(ctx context.Context, id string) error

	// Token operations
	CreateSession(ctx context.Context, userID string, token string, expiresAt time.Time) error
	GetSession(ctx context.Context, token string) (string, error) // returns userID
	DeleteSession(ctx context.Context, token string) error
}
