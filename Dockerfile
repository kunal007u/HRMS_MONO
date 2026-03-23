# Use the official Node.js 22 image based on Alpine Linux
FROM node:22-alpine

# Set the working directory inside the container to /app
WORKDIR /app

# Copy package.json and optional package-lock.json to the working directory
COPY workspace_internal_backend/package.json ./
COPY workspace_internal_backend/package-lock.json* ./

# Install the dependencies specified in package.json
RUN npm install

# Copy the rest of the application code to the working directory
COPY workspace_internal_backend/ /app

# Install netcat for health checks
RUN apk add --no-cache netcat-openbsd

# Expose port 9000 to allow external access
EXPOSE 9000

# Wait for the database to be ready and run migrations
CMD ["sh", "-c", "until nc -z -v -w30 db 5432; do echo 'Waiting for database connection...'; sleep 1; done; npx sequelize-cli db:migrate && node server.js"]