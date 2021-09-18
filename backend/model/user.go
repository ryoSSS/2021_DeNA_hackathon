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

type UserWithMessages struct {
	ID       int64     `json:"id"`
	Name     string    `json:"name"`
	Birthday time.Time `json:"birthday"`
	Messages []Message `json:"messages"`
}

type CreateUserResponse struct {
	ID int64 `json:"userId"`
}
