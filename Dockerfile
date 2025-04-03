FROM node:20-alpine3.21

WORKDIR /usr/src/app

COPY package*.json .

RUN npm ci --only=production

COPY . .

CMD [ "node", "index.js" ]
