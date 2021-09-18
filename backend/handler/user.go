package handler

import (
	"net/http"

	"github.com/labstack/echo/v4"
	"github.com/ryoSSS/2021_DeNA_hackathon/backend/controller"
	"github.com/ryoSSS/2021_DeNA_hackathon/backend/model"
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

	user := model.User{}

	if err := c.Bind(user); err != nil {
		return c.JSON(http.StatusBadRequest, err)
	}

	id, err := h.userContoller.Create(&user)

	if err != nil {
		return c.JSON(http.StatusBadRequest, err)
	}

	return c.JSON(http.StatusOK, id)
}
