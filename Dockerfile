# Base image
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install root dependencies
RUN npm install

# Copy frontend package files
COPY frontend/package*.json ./frontend/

# Install frontend dependencies
WORKDIR /app/frontend
RUN npm install

# Copy all project files
COPY . .

# Build frontend
ENV NODE_ENV=production
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
CMD ["npm", "start"] 