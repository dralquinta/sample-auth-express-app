# Use the official Python image from the Docker Hub
FROM python:3.9-slim

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy the requirements file into the container
COPY requirements.txt ./

# Install the dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Copy the service account key file
COPY credentials.json /usr/src/app/credentials.json

# Copy the rest of the application code into the container
COPY . .

# Expose the port the app runs on
EXPOSE 8080

# Set the environment variable for the service account key
ENV GOOGLE_APPLICATION_CREDENTIALS="/usr/src/app/credentials.json"

# Run the application
CMD ["gunicorn", "--bind", "0.0.0.0:8080", "app:app"]
