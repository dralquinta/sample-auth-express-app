# Use the official Node.js image from the Docker Hub
FROM node:14-alpine

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package*.json ./
RUN npm install

# Copy the service account key file
COPY src/serviceAccountKey.json ./src/serviceAccountKey.json

# Bundle app source
COPY . .

# Bind to port 8080
EXPOSE 8080

# Start the app
CMD ["node", "src/app.js"]
