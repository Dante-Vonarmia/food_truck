Food Truck Finder

> Explore San Francisco's vibrant street food scene with our easy-to-use app.

Food Truck (shot.png)

Introduction

This project is an engaging web application designed to help users discover food trucks in San Francisco. Leveraging the latest technologies in web development, the app provides a robust and intuitive interface for finding and exploring street food options. The backend is powered by Node.js and Express, integrating with Elasticsearch for efficient data retrieval. The frontend is developed using React, with GraphQL handling data operations seamlessly. Interactive maps provided by Mapbox enhance the user experience by visually representing food truck locations.

Features

- Search Functionality: Quickly find food trucks based on the food items they offer.
- Interactive Maps: View the exact locations of food trucks on an interactive map.
- Mobile Responsive: Fully responsive design that works on mobile, tablets, and desktops.

Getting Started

To get a local copy up and running follow these simple steps.

Prerequisites

- Node.js
- npm
npm install npm@latest -g
- Docker

Installation

1. Clone the repo
git clone https://github.com/your_username_/Project-Name.git
2. Install NPM packages
npm install
3. Start the application
npm start

Docker Deployment

1. Build the Docker image
docker build -t foodtruck-web .
2. Run the Docker container
docker run -dp 3000:3000 foodtruck-web

Technology Stack

- Backend: Node.js, Express
- Database: Elasticsearch
- Frontend: React, React Apollo
- API: GraphQL
- Styling: CSS-in-JS
- Deployment: Docker, potentially scalable to AWS ECS with provided scripts

Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are greatly appreciated.

1. Fork the Project
2. Create your Feature Branch (git checkout -b feature/AmazingFeature)
3. Commit your Changes (git commit -m 'Add some AmazingFeature')
4. Push to the Branch (git push origin feature/AmazingFeature)
5. Open a Pull Request

License

Distributed under the MIT License. See LICENSE for more information.

Acknowledgements

- Node.js (https://nodejs.org/)
- React (https://reactjs.org/)
- Elasticsearch (https://www.elastic.co/)
- Mapbox (https://www.mapbox.com/)
- SF Data (https://data.sfgov.org/)

Learn more about deploying Docker containers and managing scalable infrastructure in our project documentation (https://example.com/docs).
