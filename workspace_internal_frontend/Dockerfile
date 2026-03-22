# Stage 1: Build the React application
FROM node:22-alpine AS build

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . /app

# Declare build arguments
ARG VITE_CIPHER
ARG VITE_BASE_URL
ARG VITE_PATH_PREFIX

# Set them as environment variables for Vite build
ENV VITE_CIPHER=${VITE_CIPHER}
ENV VITE_BASE_URL=${VITE_BASE_URL}
ENV VITE_PATH_PREFIX=${VITE_PATH_PREFIX}

# Build the React application
RUN npm run build

# Stage 2: Serve the React application with Nginx
FROM nginx:alpine

# Create a custom directory for the build output inside Nginx's web root
RUN mkdir -p /usr/share/nginx/hrms_build

# Copy the built React application from the build stage
COPY --from=build /app/dist /usr/share/nginx/hrms_build

# Copy the Nginx configuration from the frontend workspace directory
COPY nginx.conf /etc/nginx/nginx.conf

# Expose port 80
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]