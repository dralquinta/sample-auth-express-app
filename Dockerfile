FROM node:14-alpine

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package*.json ./
RUN npm install

# Bundle app source
COPY . .

# Bind to port 8080
EXPOSE 8080

# Start the app
CMD [ "node", "server.js" ]
