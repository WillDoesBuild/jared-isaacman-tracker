FROM node:22-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

RUN node fetchLocation.js || true

RUN npm install -g http-server

EXPOSE 3000

CMD sh -c "node fetchLocation.js && http-server . -p 3000"
