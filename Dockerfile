FROM node:13

WORKDIR /home/node/app

COPY . .

RUN npm install http-server

COPY ./packages/example/public/index.html index.html

EXPOSE 8080
EXPOSE 4321

CMD node packages/example/src/server.js & node_modules/.bin/http-server
