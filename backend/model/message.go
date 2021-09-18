package model

import "time"

type Message struct {
	ID        int64     `db:"id"`
	Content   string    `db:"content"`
	UserId    int64     `db:"user_id"`
	CreatedAt time.Time `db:"created_at"`
}
