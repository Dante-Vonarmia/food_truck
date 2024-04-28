
# Food Truck Application

## Project Overview

This Food Truck application serves as a full-stack project built with React, Node.js, and Elasticsearch. It's designed to showcase real-time data interaction with a map interface, where users can find food trucks in a city, explore their menus, and locate them on the map.

## Prerequisites

- Docker
- Node.js (v18.17.0)
- NPM

## Installation and Local Development

1. **Clone the repository:**
   ```bash
   git clone https://github.com/yourusername/foodtruck-app.git
   cd foodtruck-app
   ```

2. **Navigate to the app directory:**
   ```bash
   cd food_truck/app
   ```

3. **Install dependencies:**
   ```bash
   npm install
   ```

4. **Build the project:**
   ```bash
   npm run build
   ```

5. **Start the application locally:**
   ```bash
   npm start
   ```
   This command will start the backend server on `http://localhost:3000` and will also serve the frontend.

## Docker Deployment

1. **Build the Docker image:**
   ```bash
   docker build -t dva89/foodtruck-app .
   ```

2. **Run the Docker containers:**
   ```bash
   docker-compose up
   ```
   This will start both the application and the Elasticsearch service as defined in the `docker-compose.yml`.

## Project Structure

```
/food-truck-app
|-- /src
|   |-- /client       # Client-specific code (React, CSS)
|   |   |-- components  # React components
|   |   |-- App.js
|   |   |-- index.js
|   |-- /server       # Server-specific code (Express, GraphQL)
|   |   |-- api       # API logic and controllers
|   |   |-- config    # Server config files
|   |   |-- routes    # Defines all routes and their controllers
|   |   |-- services  # Backend service logic, e.g., interacting with Elasticsearch
|-- /public           # Static files and compiled output
|-- /config           # Configuration files like Webpack
|-- /scripts          # Scripts for building and running the project
|-- package.json      # Node project dependencies and scripts
|-- Dockerfile
|-- docker-compose.yml
|-- README.md
```

## Important Notes

- Ensure Docker is correctly installed and configured on your machine before attempting to run the Docker commands.
- The application uses a mocked backend for demonstration purposes; adjust the data endpoints for production use.

This README provides a concise yet comprehensive guide to getting the Food Truck application running on your local development machine and using Docker for deployment.
