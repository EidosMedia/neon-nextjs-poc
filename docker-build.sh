#!/bin/bash

version=$(cat package.json | grep -o '"version": "[^"]*' | grep -o '[^"]*$')
eval $(minikube -p minikube docker-env)
docker buildx build --platform linux/arm64 --tag "neon-nextjs-fe-sandbox-fe:$version" --build-arg NEON_BASE_HOST=http://test-region-a-fe.neon.com .