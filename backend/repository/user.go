package repository

import (
	"time"

	"github.com/jmoiron/sqlx"
)

func InsertUser(db *sqlx.DB, name string, birthday time.Time) (int64, error) {
	result, err := db.Exec("insert into users (name, birthday) values (?, ?)", name, birthday)
	if err != nil {
		return 0, err
	}

	return result.LastInsertId()
}
