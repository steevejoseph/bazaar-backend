# Build stage
FROM node:18-alpine AS builder

# Set working directory
WORKDIR /app

# Install pnpm
RUN npm install -g pnpm@8.15.4

# Copy package files for better caching
COPY package.json pnpm-lock.yaml* ./
COPY frontend/package.json frontend/

# Install dependencies with --no-frozen-lockfile to allow updates
RUN pnpm install --no-frozen-lockfile
WORKDIR /app/frontend
RUN pnpm install --no-frozen-lockfile
WORKDIR /app

# Copy source files
COPY . .

# Build frontend with explicit environment
ENV NODE_ENV=production
RUN cd frontend && NODE_OPTIONS="--max_old_space_size=4096" pnpm run build

# Production stage
FROM node:18-alpine

# Install pnpm
RUN npm install -g pnpm@8.15.4

# Install production dependencies only
WORKDIR /app

COPY package.json pnpm-lock.yaml* ./
RUN pnpm install --prod --no-frozen-lockfile

# Copy built frontend and necessary files
COPY --from=builder /app/frontend/build ./frontend/build
COPY --from=builder /app/api ./api
COPY --from=builder /app/bin ./bin
COPY --from=builder /app/app.js .
COPY --from=builder /app/config ./config

# Create uploads directory
RUN mkdir -p ./api/uploads

# Set production environment
ENV NODE_ENV=production

# Expose port
EXPOSE 3000

# Start the application
CMD ["pnpm", "start"] 