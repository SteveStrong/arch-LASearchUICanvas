FROM node:12-alpine AS builder
ENV APP=/var/www

#  docker login --username=apprenticesystems
#  Sedona

# Create app directory
RUN mkdir -p $APP
WORKDIR $APP

# Install app dependencies
COPY package*.json $APP/

RUN npm install

COPY . $APP
RUN npm run-script build-prod

FROM nginx:stable-alpine
ENV APP=/var/www
WORKDIR /usr/share/nginx/html

# https://stackoverflow.com/questions/56213079/404-error-on-page-refresh-with-angular-7-nginx-and-docker
# now there is a folder in dist
COPY --from=builder ${APP}/dist/LASearchUICanvas .
COPY ./nginx.conf /etc/nginx/nginx.conf

EXPOSE 80 443
CMD ["nginx", "-g", "daemon off;"]


# docker build -t lasearchuicanvas -f Dockerfile  .
# docker run -p 8080:80 -d --name lasearchuicanvas lasearchuicanvas

# to inspect
# docker run -it -p 8080:80  lasearchuicanvas /bin/bash
