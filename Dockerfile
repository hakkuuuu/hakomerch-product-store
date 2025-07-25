# Base image
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy all package files first
COPY package*.json ./
COPY frontend/package*.json ./frontend/
COPY backend/ ./backend/

# Install root dependencies
RUN npm install

# Install and build frontend
WORKDIR /app/frontend
RUN npm install
RUN npm run build

# Go back to root directory
WORKDIR /app

# Clean up dev dependencies
RUN npm prune --production && \
    cd frontend && \
    npm prune --production

# Expose port
EXPOSE 10000

# Start the application
CMD ["node", "backend/server.js"] 