package model

import (
	"strings"
	"time"
)

// フロントとの間で取り決めたフォーマット
const timeFormat = "2006/01/02"

type Date struct {
	time.Time
}

func NewDate(t time.Time) Date {
	return Date{t}
}

func (d Date) MarshalJSON() ([]byte, error) {
	return []byte(`"` + d.Time.Format(timeFormat) + `"`), nil
}

func (d *Date) UnmarshalJSON(data []byte) error {
	trimData := strings.Trim(string(data), `"`)
	timeTime, err := time.Parse(timeFormat, trimData)
	if err != nil {
		return err
	}

	*d = Date{timeTime}
	return nil
}
