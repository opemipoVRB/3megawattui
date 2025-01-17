# base image
FROM node:12.2.0-alpine

# set working directory
WORKDIR /3megawattui

ENV PATH /3megawattui/node_modules/.bin:$PATH

# install and cache app dependencies
COPY package.json /3megawattui/package.json
RUN npm install --silent
RUN npm install react-scripts@3.0.1 -g --silent

RUN adduser -D user

USER user

# start app
CMD ["npm", "start"]
