FROM node:14-alpine

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package*.json ./
RUN npm install
RUN npm audit fix

# Bundle app source
COPY src ./src
COPY public ./public

# Bind to port 8080
EXPOSE 8080

# Start the app
CMD [ "node", "src/server.js" ]