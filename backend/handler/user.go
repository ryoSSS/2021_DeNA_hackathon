package handler

import (
	"net/http"
	"time"

	"github.com/labstack/echo/v4"
	"github.com/ryoSSS/2021_DeNA_hackathon/backend/controller"
)

type UserHandler struct {
	userContoller *controller.UserController
}

func NewUserHandler(
	userController *controller.UserController,
) *UserHandler {
	return &UserHandler{
		userContoller: userController,
	}
}

func (h *UserHandler) Create(c echo.Context) error {

	id, err := h.userContoller.Create("name", time.Now())

	if err != nil {
		return c.JSON(http.StatusBadRequest, err)
	}

	return c.JSON(http.StatusOK, id)
}
