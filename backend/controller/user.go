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

func (u *UserController) GetWithMessages(userId int64) (*model.UserWithMessages, error) {
	user, err := repository.GetUser(u.db, userId)
	if err != nil {
		return nil, err
	}

	messages, err := repository.GetMessagesByUserId(u.db, userId)
	if err != nil {
		return nil, err
	}

	userWithMessages := model.UserWithMessages{
		ID:       user.ID,
		Name:     user.Name,
		Birthday: model.NewDate(user.Birthday),
		Messages: messages,
	}

	return &userWithMessages, nil
}
