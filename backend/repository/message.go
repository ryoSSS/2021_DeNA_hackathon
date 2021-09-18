package repository

import (
	"github.com/jmoiron/sqlx"
	"github.com/ryoSSS/2021_DeNA_hackathon/backend/model"
)

func InsertMessage(db *sqlx.DB, message *model.Message) (int64, error) {
	result, err := db.Exec("insert into messages (content, user_id, object_id, writer_name) values (?, ?, ?, ?)",
		message.Content, message.UserId, message.ObjectId, message.WriterName)
	if err != nil {
		return 0, err
	}

	return result.LastInsertId()
}

func GetMessagesByUserId(db *sqlx.DB, userId int64) ([]model.Message, error) {
	messages := []model.Message{}
	err := db.Select(&messages, "select * from messages where user_id = ?", userId)
	if err != nil {
		return nil, err
	}

	return messages, nil
}
