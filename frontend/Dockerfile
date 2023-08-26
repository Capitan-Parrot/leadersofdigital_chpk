# pull official base image
FROM node:20-alpine3.17

# set working directory
WORKDIR /app

# install app dependencies
COPY package.json ./
COPY package-lock.json ./
RUN npm i --lockfile-version 3
RUN npm i vite -g

# add app
COPY . ./

ARG VITE_API_URL

ENV VITE_API_URL $VITE_API_URL

# start app
CMD ["npm", "run", "dev"]