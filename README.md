# Healthcare Assistance Website

A full-stack web application providing healthcare assistance, search medical facilities on physical map (**Google Map API**), real-time chat, authentication (**JWT & Cookie**), appointment booking using **MERN stack**, and **Spring Boot**.

[Theseus Link](https://www.theseus.fi/handle/10024/861496) [Deploy](https://healthcare-assistance.vercel.app/)

## 📸 Overview
![Overview](./Overview.png)

## 🚀 Features
- User authentication
- Searching medical facilities (max 20 - Google API restriction)
- Appointment booking system
- Real-time chat with doctors/agency (**encrypted content**, **Socket.IO**)
- Health record management

## 🛠️ Tech Stack
- **Frontend**: React TypeScript, Redux-Toolkit, TanStack Query, Tailwind CSS, Socket.IO 
- **Backend**: Express (for searching, chat services, authentication), Spring Boot (for appointment)
- **Database**: MongoDB
- **Authentication**: JWT-based authentication (Cookie)

## 🎯 Installation & Setup

### Clone project from GitHub repository
```sh
git clone https://github.com/hoan301298/Healthcare-Assistance.git
```

### Prerequisites
Ensure you have the following installed:
- Node.js & npm
- Java & Spring Boot
- MongoDB

### Environment Variables (.env Setup)

Replace your_google_maps_api_key with your actual Google Maps API key.

**If you do not have your Google Maps API key, please access & create yours at (select options Geocoding API, Places API (New), Maps JavaScript API): https://console.cloud.google.com/apis**

Create a .env file in each frontend and backend directories and add the following:

```sh
# Client
VITE_MAP_API_KEY=??
VITE_GEOCODE_URL=https://maps.googleapis.com/maps/api/geocode/json
VITE_NODE_SERVER_API=http://localhost:5000
VITE_SPRINGBOOT_SERVER_API=http://localhost:5001
```

```sh
# Node-server
MONGO_URL=??
SECRET_KEY=your_jwt_secret_here # example: secret-key
ENCRYPT_KEY=f3a1c9d7b8e45f92a6b1c3e4d5f7a8901234567890abcdef1234567890abcdef
EMAIL_HASH_SALT=9f4b2c7d8e1a3b5c6d7e8f901234567890abcdef1234567890abcdef12345678
GOOGLE_MAP_API_KEY=??
NODEMAILER_API_KEY=??
PLACES_NEARBY_URL=https://places.googleapis.com/v1/places:searchNearby
NODE_ENV=dev
PORT=5000
```

```sh
# SpringBoot-server
SPRING_DATA_MONGODB_URI=??
SERVER_PORT=5001
SECRET_KEY=9f4b2c7d8e1a3b5c6d7e8f901234567890abcdef1234567890abcdef12345678
ENCRYPT_KEY=f3a1c9d7b8e45f92a6b1c3e4d5f7a8901234567890abcdef1234567890abcdef
ORIGINS_URL=http://localhost:5000
```

### Frontend Setup (React)
```sh
cd client
npm install

# This step will build and copy dist into node-server.
npm run build
```

### Backend Setup (Express + Spring Boot)
```sh
# Navigate to server directory
cd node-server
npm install

# Node-server will serve the frontend and APIs (static)
npm run start:dev

# Navigate to booking-server directory from root
cd springboot-server
mvn clean install
mvn spring-boot:run
```

After starting the project, access the application at: http://localhost:5000

Frontend + Express: port 5000
Spring Boot: port 5001

## 🤝 Contributing
Contributions are welcome! Fork the repository and create a pull request.
Feel free to modify and improve the project as needed. Happy coding! 🎉