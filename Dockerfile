# Stage 1: Build the app using Bun
FROM oven/bun:latest as builder

# Set the working directory inside the container
WORKDIR /app

# Copy the package.json and bun.lockb files first for better caching
COPY package.json ./

# Install dependencies
RUN bun install

# Copy the rest of the application code
COPY . .

# openapi
# RUN bun run openapi
ARG VITE_OPENAPI_URL
ENV VITE_OPENAPI_URL=$VITE_OPENAPI_URL
RUN bun run openapi

# Build the application
RUN bun run build


# Stage 2: Serve the built files with Nginx
FROM nginx:alpine

# Copy the built files from the builder stage
COPY --from=builder /app/dist /usr/share/nginx/html

# Copy the custom Nginx configuration file
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose the port
EXPOSE 80

# Start Nginx server
CMD ["nginx", "-g", "daemon off;"]