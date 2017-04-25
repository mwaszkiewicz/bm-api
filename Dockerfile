FROM node:boron

MAINTAINER Mateusz Waszkiewicz

ENV NODE_ENV=staging
ENV PORT=3000

RUN mkdir -p /usr/src/bm
WORKDIR /usr/src/bm

ADD package.json /usr/src/bm/
RUN npm install
RUN npm install cors --save-dev

COPY . /usr/src/bm

EXPOSE 3000

CMD ["npm", "start"]
