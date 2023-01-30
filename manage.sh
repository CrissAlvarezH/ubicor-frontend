#!/bin/bash


action=$1


build_img() {
  version=$1
  [ -z "$version" ] && version=0.1 && printf "\nset default version 0.1\n"

  docker build \
      --build-arg API_BASE_URL=http://api.ubicor.alvarezcristian.com \
      --no-cache \
      -t crissalvarezh/ubicor-frontend:$version \
      .

  docker tag crissalvarezh/ubicor-frontend:$version crissalvarezh/ubicor-frontend:latest
}


push_img() {
  version=$1
  docker push crissalvarezh/ubicor-frontend:$version
  docker push crissalvarezh/ubicor-frontend:latest
}


if [ "$action" = "build" ]; then
  build_img "$2"

elif [ "$action" = "publish" ]; then
  build_img "$2"
  push_img "$2"

elif [ "$action" = "push-img" ]; then
  push_img "$2"

elif [ "$action" = "deploy" ]; then

  ssh -o StrictHostKeyChecking=no \
      -i ./server-key.pem ec2-user@alvarezcristian.com \
      "cd /home/ec2-user/cristian-projects-server && make reload service=ubicor-frontend"

fi