package controller

import (
	"github.com/jmoiron/sqlx"
	"github.com/ryoSSS/2021_DeNA_hackathon/backend/repository"
)

type MessageController struct {
	db *sqlx.DB
}

func NewMessageController(db *sqlx.DB) *MessageController {
	return &MessageController{
		db: db,
	}
}

func (u *MessageController) Create(content string, userId int64) (int64, error) {
	return repository.InsertMessage(u.db, content, userId)
}
