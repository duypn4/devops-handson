FROM node AS build

WORKDIR /code

COPY . .

RUN npm install

RUN npm run build

FROM nginx

WORKDIR /usr/share/nginx/html

COPY --from=build /code/build .