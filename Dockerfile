FROM node:18

ARG NEON_BASE_HOST
ENV NEON_BASE_HOST=${NEON_BASE_HOST}
ENV NEON_API_KEY="fake"
ENV PORT=3000
ENV DEV_MODE=true

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3000
RUN npm run build
CMD npm run start