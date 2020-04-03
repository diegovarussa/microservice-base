## How to run local:
```sh
BASIC_AUTH_PASS=123456 PORT=8080 ROARR_LOG=true node src/app.js
```
## How to build
```sh
docker build -t diegovarussa/microservice-base:latest .
```

## How to push
```sh
docker push diegovarussa/microservice-base:latest
```

## How to run docker local
```sh
docker run --rm --name microservice -it -p 80:8080 --env "BASIC_AUTH_PASS=123456" diegovarussa/microservice-base:latest
```

## HTTP Basic Auth Defaults
```
user: environment
pass: 123456
```