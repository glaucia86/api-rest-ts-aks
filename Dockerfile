FROM node:20.5.1-slim

USER node

WORKDIR /home/node/app

COPY --chown=node package*.json ./

RUN npm install

CMD ["npm", "run", "start:dev"]