#!/bin/bash

docker buildx build --platform linux/arm64 --tag "neon-nextjs-fe-sandbox-fe:5.1.1" --build-arg NEON_BASE_HOST=http://test-region-a-fe.neon.com .