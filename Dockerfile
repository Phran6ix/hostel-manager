FROM node:20-alpine

WORKDIR /app

COPY  package.json .

RUN npm install

COPY . ./ 

EXPOSE 30001

CMD [ "ts-node","src/index.ts" ]
