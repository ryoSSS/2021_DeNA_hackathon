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
