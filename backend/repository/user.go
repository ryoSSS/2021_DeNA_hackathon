package repository

import (
	"github.com/jmoiron/sqlx"
	"github.com/ryoSSS/2021_DeNA_hackathon/backend/model"
)

func InsertUser(db *sqlx.DB, user *model.User) (int64, error) {
	result, err := db.Exec("insert into users (name, birthday) values (?, ?)", user.Name, user.Birthday)
	if err != nil {
		return 0, err
	}

	return result.LastInsertId()
}

func GetUser(db *sqlx.DB, userId int64) (*model.User, error) {
	user := model.User{}
	err := db.Get(&user, "select * from users where id = ?", userId)
	if err != nil {
		return nil, err
	}

	return &user, nil
}
