# Use the node:20.5.1-slim as the base image
FROM node:20.5.1-slim

ENV NODE_ENV=production

# Set the working directory and user to node
WORKDIR /home/node/app

# Copy package.json and package-lock.json files
COPY --chown=node package*.json ./

# Install project dependencies
RUN npm install

# Quando fizer a entrega descomentar esse código
CMD ["npm", "run", "start:dev"]

#CMD ["tail", "-f", "/dev/null"]