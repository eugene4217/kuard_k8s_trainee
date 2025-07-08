# STAGE 1: Build
FROM golang:1.20-alpine AS build

# Установка зависимостей
RUN apk update && apk upgrade && \
    apk add --no-cache git nodejs bash npm make gcc musl-dev

# Установка инструментов сборки (современные версии)
RUN go install github.com/go-bindata/go-bindata/v3/go-bindata@v3.1.3 && \
    go install github.com/tools/godep@v80

# Создание структуры проекта
WORKDIR /go/src/github.com/kubernetes-up-and-running/kuard

# Копирование исходников
COPY . .

# Настройка окружения
ENV VERBOSE=0 \
    PKG=github.com/kubernetes-up-and-running/kuard \
    ARCH=amd64 \
    VERSION=test \
    PATH="/go/bin:$PATH"

# Проверка и выполнение скрипта сборки
RUN chmod +x build/build.sh && \
    ./build/build.sh

# STAGE 2: Deployment
FROM alpine:3.18

# Установка зависимостей времени выполнения
RUN apk add --no-cache ca-certificates

# Настройка пользователя и копирование бинарника
USER nobody:nobody
COPY --from=build /go/bin/kuard /kuard

# Проверка бинарника
RUN ls -l /kuard && \
    chmod +x /kuard

CMD [ "/kuard" ]
