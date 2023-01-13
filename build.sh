#!/bin/bash
version=$1
[ -z $version ] && version=0.1 && echo "\nset defaul version 0.1\n"

docker build --build-arg API_BASE_URL=http://api.ubicor.alvarezcristian.com --no-cache -t crissalvarezh/ubicor-frontend:$version .

docker tag crissalvarezh/ubicor-frontend:$version crissalvarezh/ubicor-frontend:latest

docker push crissalvarezh/ubicor-frontend:$version
docker push crissalvarezh/ubicor-frontend:latest
