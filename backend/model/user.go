package model

import "time"

type User struct {
	ID        int64     `db:"id"`
	Name      string    `db:"name"`
	Birthday  time.Time `db:"birthday"`
	CreatedAt time.Time `db:"created_at"`
}

type CreateUserParam struct {
	Name     string `db:"name"`
	Birthday string `db:"birthday"`
}
