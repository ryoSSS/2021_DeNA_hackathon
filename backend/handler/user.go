package handler

import (
	"fmt"
	"image/png"
	"net/http"
	"strconv"

	"github.com/fogleman/gg"
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

	birthday := param.Birthday.Time

	user := model.User{
		Name:     param.Name,
		Birthday: birthday,
	}

	id, err := h.userContoller.Create(&user)

	if err != nil {
		return c.JSON(http.StatusBadRequest, err)
	}

	return c.JSON(http.StatusOK, model.CreateUserResponse{ID: id})
}

func (h *UserHandler) GetWithMessages(c echo.Context) error {
	id := c.Param("id")
	userId, err := strconv.ParseInt(id, 10, 64)

	user, err := h.userContoller.GetWithMessages(userId)

	if err != nil {
		return c.JSON(http.StatusBadRequest, err)
	}

	return c.JSON(http.StatusOK, user)
}

func (h *UserHandler) GetImage(c echo.Context) error {

	image, err := gg.LoadImage("./assets/5.png")

	if err != nil {
		return c.JSON(http.StatusBadRequest, err)
	}

	response := c.Response()
	response.Header().Set("Cache-Control", "no-store")
	response.Header().Set(echo.HeaderContentType, echo.MIMEOctetStream)
	response.Header().Set(echo.HeaderAccessControlExposeHeaders, "Content-Disposition")
	response.Header().Set(echo.HeaderContentDisposition, "attachment; filename="+"ファイル名+拡張子")

	response.WriteHeader(200)

	if err := png.Encode(response.Writer, image); err != nil {
		fmt.Println("error:png\n", err)
		return c.JSON(http.StatusBadRequest, err)
	}

	return c.NoContent((http.StatusOK))
}
