FROM node:20

# Set working directory
WORKDIR /app/frontend/places-sjsu

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose the port your app runs on
EXPOSE 5173

# Command to run your application
CMD ["npm", "run", "start"]
