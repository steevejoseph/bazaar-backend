# Build stage
FROM node:18-alpine AS builder

# Set working directory
WORKDIR /app

# Install pnpm globally
RUN npm install -g npm

# Copy package files for better caching
COPY package.json pnpm-lock.yaml ./
COPY frontend/package.json frontend/

# Install dependencies
RUN npm install
WORKDIR /app/frontend
RUN npm install
WORKDIR /app

# Copy source files
COPY . .

# Build frontend
RUN cd frontend && npm run build

# Production stage
FROM node:18-alpine

# Install production dependencies only
WORKDIR /app

COPY package.json pnpm-lock.yaml ./
RUN npm install -g npm && npm install --prod

# Copy built frontend and necessary files
COPY --from=builder /app/frontend/build ./frontend/build
COPY --from=builder /app/api ./api
COPY --from=builder /app/bin ./bin
COPY --from=builder /app/app.js .
COPY --from=builder /app/config ./config

# Add non-root user for security
RUN addgroup -S appgroup && adduser -S appuser -G appgroup
USER appuser

# Set production environment
ENV NODE_ENV=production

# Expose port
EXPOSE 3000

# Start the application
CMD ["npm", "start"] 