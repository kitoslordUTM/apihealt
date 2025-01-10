FROM node:18-alpine-x64 

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3007

CMD ["node", "dist/server.js"]
