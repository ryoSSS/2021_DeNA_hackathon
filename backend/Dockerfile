FROM golang:1.16-buster AS base

RUN apt-get update && \
    cp /usr/share/zoneinfo/Asia/Tokyo /etc/localtime && \
    echo "Asia/Tokyo" > /etc/timezone

RUN apt install -y fonts-ipafont

ENV PORT 8080
EXPOSE 8080

WORKDIR /go/src/github.com/ryoSSS/2021_DeNA_hackathon/backend

# ローカルでの開発用
FROM base AS dev

RUN go get -v github.com/pilu/fresh

CMD [ "fresh" ]

# ビルド用
FROM base AS builder

COPY go.* ./
RUN go mod download

COPY . ./

RUN CGO_ENABLED=0 GOOS=linux go build -mod=readonly -x -o /go/bin/server

# バイナリ実行
FROM debian:buster-slim AS release

RUN set -x && \
    apt-get update && \
    DEBIAN_FRONTEND=noninteractive apt-get install -y \
      ca-certificates && \
    rm -rf /var/lib/apt/lists/*

COPY --from=builder /go/bin/server /server
COPY --from=builder ./assets/ /assets/
COPY --from=base /etc/alternatives/fonts-japanese-gothic.ttf /etc/alternatives/fonts-japanese-gothic.ttf

CMD [ "/server" ]
