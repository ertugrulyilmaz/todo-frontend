FROM node:alpine AS build

WORKDIR /todo-frontend

COPY . .

RUN yarn && yarn build

FROM nginx:stable-alpine

COPY --from=build /todo-frontend/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /todo-frontend/build/. /usr/share/nginx/html

EXPOSE 80
