FROM node:20-alpine

WORKDIR /var/www/client

COPY package.json ./

RUN yarn install

COPY . .

CMD [ "yarn", "start" ]
