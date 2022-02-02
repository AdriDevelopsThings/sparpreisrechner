FROM node:16
WORKDIR /app

COPY ./package.json ./package.json
COPY ./yarn.lock ./yarn.lock

RUN yarn install --pure-lockfile

COPY ./pages ./pages
COPY ./styles ./styles
COPY ./utils ./utils

COPY ./next.config.js .


RUN yarn next build

EXPOSE 80
CMD ["yarn", "next", "start", "-p", "80"]