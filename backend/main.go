package main

import (
	"log"
	"net/http"
	"os"

	_ "github.com/go-sql-driver/mysql"
	"github.com/jmoiron/sqlx"
	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
	"github.com/ryoSSS/2021_DeNA_hackathon/backend/config"
	"github.com/ryoSSS/2021_DeNA_hackathon/backend/controller"
	"github.com/ryoSSS/2021_DeNA_hackathon/backend/handler"
)

func main() {
	e := echo.New()
	e.Use(middleware.CORS())

	conf := config.InitConfig()
	dsn := conf.DSN()
	db, err := sqlx.Connect("mysql", dsn)
	if err != nil {
		log.Fatal(err)
	}

	userContoller := controller.NewUserController(db)
	userHandler := handler.NewUserHandler(userContoller)

	messageController := controller.NewMessageController(db)
	messageHandler := handler.NewMessageHandler(messageController)

	e.GET("/", func(c echo.Context) error {
		return c.String(http.StatusOK, "Hello, World!")
	})

	e.POST("/users", userHandler.Create)

	e.GET("/users/:id", userHandler.GetWithMessages)

	e.POST("/messages", messageHandler.Create)

	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}
	e.Logger.Fatal(e.Start(":" + port))
}
