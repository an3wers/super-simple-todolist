FROM node:20-alpine

WORKDIR /var/www/server

COPY package*.json ./

RUN npm install

COPY . .

CMD [ "npm", "run", "dev" ]
