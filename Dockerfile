FROM node:20-alpine

USER node
WORKDIR /home/node/app

COPY --chown=node package*.json ./

RUN npm install

# Quando fizer a entrega descomentar esse código
CMD ["npm", "run", "start:dev"]

#CMD ["tail", "-f", "/dev/null"]