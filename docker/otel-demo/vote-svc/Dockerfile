FROM node

WORKDIR /dog/app

COPY package*.json .

RUN npm install

COPY *.js .

EXPOSE 80

CMD ["node", "index.js"]