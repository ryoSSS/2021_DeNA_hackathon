package repository

import (
	"github.com/jmoiron/sqlx"
)

func InsertMessage(db *sqlx.DB, content string, userId int64) (int64, error) {
	result, err := db.Exec("insert into messages (content, user_id) values (?, ?)", content, userId)
	if err != nil {
		return 0, err
	}

	return result.LastInsertId()
}
