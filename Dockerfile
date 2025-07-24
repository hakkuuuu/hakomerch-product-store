# Base image
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Install global dependencies
RUN npm install -g vite

# Copy package files
COPY package*.json ./
COPY frontend/package*.json ./frontend/

# Install root dependencies
RUN npm install

# Install frontend dependencies
WORKDIR /app/frontend
RUN npm install --legacy-peer-deps

# Copy all project files
COPY . .

# Build frontend
RUN npm run build

# Go back to root directory
WORKDIR /app

# Clean up dev dependencies
RUN cd frontend && npm prune --production

# Expose port
EXPOSE 10000

# Start the application
CMD ["npm", "start"] 