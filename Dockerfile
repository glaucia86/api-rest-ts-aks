FROM node:20-alpine

# Set the working directory and user to node
USER node
WORKDIR /home/node/app

# Copy package.json and package-lock.json files
COPY --chown=node:node package.json package-lock.json* ./

# Install project dependencies, including TypeScript as a dev dependency
RUN npm install

# Temporarily switch to the root user to perform operations with higher permissions
USER root

# Change ownership of the entire directory to the node user
RUN chown -R node:node /home/node/app

# Switch back to the node user
USER node

# Copy the rest of the application files
COPY . .

# Uncomment this line for production
# CMD ["npm", "start"]

# For development
CMD ["npm", "run", "start:dev"]

#CMD ["tail", "-f", "/dev/null"]