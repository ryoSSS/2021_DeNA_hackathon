package model

import "time"

type Message struct {
	ID         int64     `json:"id" db:"id"`
	Content    string    `json:"content" db:"content"`
	UserId     int64     `json:"userId" db:"user_id"`
	ObjectId   int64     `json:"objectId" db:"object_id"`
	WriterName string    `json:"writerName" db:"writer_name"`
	CreatedAt  time.Time `json:"createdAt" db:"created_at"`
}

type CreateMessageResponse struct {
	ID int64 `json:"messageId"`
}

type CreateMessageParam struct {
	Content    string `json:"content"`
	UserId     int64  `json:"userId"`
	ObjectId   int64  `json:"objectId"`
	WriterName string `json:"writerName"`
}
