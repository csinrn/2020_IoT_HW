FROM node:0.12.7-wheezy


# Install app dependencies
COPY package.json /src/package.json
COPY package-lock.json /src/package.json

RUN cd /src; npm install

# Bundle app source
COPY . /src

ENV NODE_ENV dev

EXPOSE  1377
