FROM node:20

# Create app directory

WORKDIR /usr/src/app

# Install app dependencies

COPY package*.json ./

ARG TOKEN_REPO
RUN npm install git+https://${TOKEN_REPO}:x-oauth-basic@github.com/nosleepfullbuild/uniride-library.git
RUN npm install

# Im using Typescript

COPY . .
RUN npm run build
EXPOSE 3002

CMD [ "npm", "start" ]

