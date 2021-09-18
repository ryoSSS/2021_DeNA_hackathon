package config

import (
	"fmt"
	"os"
)

type Config struct {
	MysqlUser     string
	MysqlPassword string
	MysqlHost     string
	MysqlPort     string
	MysqlDatabase string
	MysqlOption   string
}

func InitConfig() Config {
	return Config{
		MysqlUser:     os.Getenv("MYSQL_USER"),
		MysqlPassword: os.Getenv("MYSQL_PASSWORD"),
		MysqlHost:     os.Getenv("MYSQL_HOST"),
		MysqlPort:     os.Getenv("MYSQL_PORT"),
		MysqlDatabase: os.Getenv("MYSQL_DATABASE"),
		MysqlOption:   "?parseTime=true",
	}
}

func (config Config) DSN() string {
	return fmt.Sprintf("%s:%s@tcp(%s:%s)/%s%s", config.MysqlUser, config.MysqlPassword, config.MysqlHost, config.MysqlPort, config.MysqlDatabase, config.MysqlOption)
}
