FROM node:22-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

RUN node fetch-location.js || true

RUN npm install -g http-server

EXPOSE 3000

CMD sh -c "node fetch-location.js && http-server . -p 3000"
