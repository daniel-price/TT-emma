FROM node:14

WORKDIR /usr/app

COPY package.json .
COPY yarn.lock .
COPY tsconfig.json .
COPY src .

RUN yarn 

RUN yarn build

CMD [ "yarn", "start" ]

EXPOSE 3000
