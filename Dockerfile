FROM node:alpine

USER node

WORKDIR /home/node
COPY package*.json ./
RUN npm install
COPY . .

EXPOSE 8080
CMD [ "node", "src/app.js" ]