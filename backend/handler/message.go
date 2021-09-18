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

type CreateMessageParam struct {
	Content string `json:"content"`
	UserId  int64  `json:"user_id"`
}

func NewMessageHandler(
	messageController *controller.MessageController,
) *MessageHandler {
	return &MessageHandler{
		messageContoller: messageController,
	}
}

func (h *MessageHandler) Create(c echo.Context) error {
	var param CreateMessageParam
	if err := c.Bind(&param); err != nil {
		return c.JSON(http.StatusBadRequest, err)
	}

	id, err := h.messageContoller.Create(param.Content, param.UserId)

	if err != nil {
		return c.JSON(http.StatusBadRequest, err)
	}

	return c.JSON(http.StatusOK, model.CreateMessageResponse{ID: id})
}
