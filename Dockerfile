FROM node:lts-alpine

RUN npm install -g http-server

WORKDIR /app

COPY . .

RUN npm run build

EXPOSE 7777

CMD [ "http-server", "-p 7777", "dist" ]