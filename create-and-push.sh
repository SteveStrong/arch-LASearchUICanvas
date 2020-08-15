#!/bin/bash

# https://www.elastic.co/guide/en/elasticsearch/reference/current/docker.html

# can we set up elastic search 
# docker pull docker.elastic.co/elasticsearch/elasticsearch:7.8.1

# build docker file and push to azure

# try to push elastic container to azure for a simple test
# docker login eslacontainer.azurecr.io
# docker tag elasticsearch:7.8.1 eslacontainer.azurecr.io/elasticsearch
# docker push eslacontainer.azurecr.io/elasticsearch


# docker login lacontainers.azurecr.io
# username lacontainers
# pasword  (get it from azure access keys to azurecr)

#  https://docs.microsoft.com/en-us/azure/container-registry/container-registry-get-started-docker-cli
#  to put into azurecr.io 
#  az login
#  az acr login --name lasearchuiui

docker build -t lasearchui -f Dockerfile  .
echo "build done"
docker tag lasearchui lasearchuiui.azurecr.io/lasearchui 
echo "tag done"
docker push lasearchuiui.azurecr.io/lasearchui 
echo "push done"
