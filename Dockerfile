# Step 1: Build the React app
FROM node:16-alpine AS build

# Set working directory
WORKDIR /app

# Copy package.json and yarn.lock for installing dependencies
COPY package.json yarn.lock ./

# Install dependencies using yarn
RUN yarn install --production

# Copy the rest of the application files
COPY . .

# Build the React app
RUN yarn build

# Step 2: Serve the app using a lightweight web server (nginx)
FROM nginx:alpine

# Copy custom nginx configuration
COPY nginx.conf /etc/nginx/nginx.conf

# Copy custom nginx site configuration to the sites-enabled folder
COPY nginx-yogida /etc/nginx/sites-enabled/

# Create a symbolic link to yogida.kz in the sites-available directory
RUN mkdir -p /etc/nginx/sites-available
RUN ln -s /etc/nginx/sites-enabled/nginx-yogida /etc/nginx/sites-available/

# Copy the build output to the Nginx html directory
COPY --from=build /app/build /usr/share/nginx/html

# Expose port 8888
EXPOSE 8888

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]