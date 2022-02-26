FROM amazon/aws-lambda-nodejs:14 AS builder


WORKDIR /usr/src/

COPY package*.json ./

COPY . .

RUN npm install --global yarn

RUN yarn global add rimraf 

RUN yarn global add @nestjs/cli