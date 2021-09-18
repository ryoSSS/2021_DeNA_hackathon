package controller

import (
	"github.com/jmoiron/sqlx"
	"github.com/ryoSSS/2021_DeNA_hackathon/backend/model"
	"github.com/ryoSSS/2021_DeNA_hackathon/backend/repository"
)

type UserController struct {
	db *sqlx.DB
}

func NewUserController(db *sqlx.DB) *UserController {
	return &UserController{
		db: db,
	}
}

func (u *UserController) Create(user *model.User) (int64, error) {
	return repository.InsertUser(u.db, user)
}
