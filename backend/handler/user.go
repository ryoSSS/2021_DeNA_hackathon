package handler

import (
	"net/http"
	"time"

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

	var param model.CreateUserParam
	if err := c.Bind(&param); err != nil {
		return c.JSON(http.StatusBadRequest, err)
	}

	birthday, err := time.Parse("2006-01-02", param.Birthday)

	if err != nil {
		return c.JSON(http.StatusBadRequest, "invalid format birthday")
	}

	user := model.User{
		Name:     param.Name,
		Birthday: birthday,
	}

	id, err := h.userContoller.Create(&user)

	if err != nil {
		return c.JSON(http.StatusBadRequest, err)
	}

	return c.JSON(http.StatusOK, id)
}
