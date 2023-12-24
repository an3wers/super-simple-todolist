FROM node:20-alpine

WORKDIR /var/www/client

COPY package.json ./

RUN yarn install

COPY . .

ENV NODE_ENV=development

CMD [ "yarn", "start" ]
