FROM node:8.11.4-alpine
RUN apk --update add imagemagick graphicsmagick
WORKDIR /
COPY . .
CMD NODE_URLS=http://*:$PORT npm start