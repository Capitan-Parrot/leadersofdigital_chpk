# pull official base image
FROM node:13.12.0-alpine

# set working directory
WORKDIR /app

# install app dependencies
COPY package.json ./
COPY package-lock.json ./
RUN npm i --lockfile-version 3

# add app
COPY . ./

ARG VITE_API_URL

ENV VITE_API_URL $VITE_API_URL

# start app
CMD ["npm", "run", "dev"]