package repository

import (
	"time"

	"github.com/jmoiron/sqlx"
)

func InsertUser(db *sqlx.DB, name string, birthday time.Time) (int64, error) {
	stmt, err := db.Preparex("insert into users (name, birthday) values ($1, $2) RETURNING id")
	if err != nil {
		return 0, err
	}

	defer func() {
		if closeErr := stmt.Close(); closeErr != nil {
			err = closeErr
		}
	}()

	var id int64
	err = stmt.QueryRow(name, birthday).Scan(&id)
	if err != nil {
		return 0, err
	}
	return id, nil
}
