package model

import "time"

type Message struct {
	ID        int64     `json:"id" db:"id"`
	Content   string    `json:"content" db:"content"`
	UserId    int64     `json:"user_id" db:"user_id"`
	CreatedAt time.Time `json:"created_at" db:"created_at"`
}

type CreateMessageResponse struct {
	ID int64 `json:"id"`
}
