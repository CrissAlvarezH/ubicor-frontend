#!/bin/bash

docker build --build-arg BUILD_TIME_API_BASE_URL=http://api.ubicor.alvarezcristian.com --no-cache -t crissalvarezh/ubicor-frontend:0.1 .

docker tag crissalvarezh/ubicor-frontend:0.1 crissalvarezh/ubicor-frontend:latest

docker push crissalvarezh/ubicor-frontend:0.1
docker push crissalvarezh/ubicor-frontend:latest
