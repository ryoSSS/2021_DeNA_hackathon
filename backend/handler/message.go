package handler

import (
	"net/http"

	"github.com/labstack/echo/v4"
	"github.com/ryoSSS/2021_DeNA_hackathon/backend/controller"
	"github.com/ryoSSS/2021_DeNA_hackathon/backend/model"
)

type MessageHandler struct {
	messageContoller *controller.MessageController
}

func NewMessageHandler(
	messageController *controller.MessageController,
) *MessageHandler {
	return &MessageHandler{
		messageContoller: messageController,
	}
}

func (h *MessageHandler) Create(c echo.Context) error {
	var param model.CreateMessageParam
	if err := c.Bind(&param); err != nil {
		return c.JSON(http.StatusBadRequest, err)
	}

	message := model.Message{
		Content:    param.Content,
		UserId:     param.UserId,
		ObjectId:   param.ObjectId,
		WriterName: param.WriterName,
	}

	id, err := h.messageContoller.Create(&message)

	if err != nil {
		return c.JSON(http.StatusBadRequest, err)
	}

	return c.JSON(http.StatusOK, model.CreateMessageResponse{ID: id})
}
