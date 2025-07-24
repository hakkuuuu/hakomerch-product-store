# Base image
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./
COPY frontend/package*.json ./frontend/

# Install dependencies (including dev dependencies for build)
RUN npm install
RUN cd frontend && npm install --production=false

# Copy project files
COPY . .

# Build frontend with dev dependencies available
RUN cd frontend && npm run build

# Clean up dev dependencies
RUN cd frontend && npm prune --production

# Expose port
EXPOSE 10000

# Start the application
CMD ["npm", "start"] 