package handler

import (
	"image/color"
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

const (
	baseImagePath = "./assets/happy_birthday.jpg"
	fontPath      = "/etc/alternatives/fonts-japanese-gothic.ttf"
)

func (h *UserHandler) GetImage(c echo.Context) error {
	id := c.Param("id")
	userId, err := strconv.ParseInt(id, 10, 64)

	user, err := h.userContoller.Get(userId)
	if err != nil {
		return err
	}

	dc := gg.NewContext(4267, 3200)
	backgroundImage, err := gg.LoadImage(baseImagePath)
	if err != nil {
		return err
	}
	// ベースにのせる
	dc.DrawImage(backgroundImage, 0, 0)
	// font size
	if err := dc.LoadFontFace(fontPath, 180); err != nil {
		return err
	}
	// フォント色
	dc.SetColor(color.Black)
	// HappyBirthdayの上に表示する文字列
	s := user.Name + " さん"
	maxWidth := float64(dc.Width())
	// ベースにのせる
	dc.DrawStringWrapped(s, 1900, 700, 0, 0, maxWidth/2, 1.5, gg.AlignLeft)

	response := c.Response()
	response.Header().Set("Cache-Control", "no-store")
	response.Header().Set(echo.HeaderContentType, echo.MIMEOctetStream)
	response.Header().Set(echo.HeaderAccessControlExposeHeaders, "Content-Disposition")
	response.Header().Set(echo.HeaderContentDisposition, "attachment; filename="+"ファイル名+拡張子")

	response.WriteHeader(200)

	if err := dc.EncodePNG(response.Writer); err != nil {
		return c.JSON(http.StatusBadRequest, err)
	}

	return c.NoContent((http.StatusOK))
}
