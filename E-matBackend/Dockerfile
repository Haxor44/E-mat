FROM golang:1.24.4-alpine AS builder
WORKDIR /app
COPY go.mod go.sum ./
RUN go mod download
COPY . .
RUN CGO_ENABLED=0 GOOS=linux go build -o /app/main ./cmd

FROM alpine:latest
WORKDIR /app
COPY --from=builder /app/main /app/main
EXPOSE 8080
CMD ["/app/main"]