# Healthcare Assistance

A full-stack web application providing healthcare assistance, search medical facilities on physical map (**Google Map API**), real-time chat, authentication (**JWT & Cookie**), appointment booking using **MERN stack**, and **Spring Boot**.

[Theseus Link](https://www.theseus.fi/handle/10024/861496) 

[Deploy version-1](https://healthcare-assistance.vercel.app)
[Deploy version-2](https://healthcare-assistance.fly.dev/) - New version (support Socket.IO)

Test section:

**Email: katarina.makinen@example.com**
**Password: example123**

## 📸 Overview
![Overview](./Overview.png)

## 🚀 Features
- User authentication & management
- Searching medical facilities (max 20 - Google API restriction)
- Appointment booking system
- Real-time chat with doctors/agency (**encrypted content**, **Socket.IO**)

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
- Java & Maven mvn
- MongoDB

### Environment Variables (.env Setup)

Replace your_google_maps_api_key with your actual Google Maps API key.

**If you do not have your Google Maps API key, please access & create yours at (select options Geocoding API, Places API (New), Maps JavaScript API): https://console.cloud.google.com/apis**

Create a .env file in each frontend and backend directories and add the following:

```sh
# Client .env
VITE_MAP_API_KEY=??
VITE_GEOCODE_URL=https://maps.googleapis.com/maps/api/geocode/json
VITE_NODE_SERVER_API=http://localhost:5000
VITE_SPRINGBOOT_SERVER_API=http://localhost:8080
```

```sh
# Node-server .env
MONGO_URL=??
SECRET_KEY=your_jwt_secret_here # example: secret-key
ENCRYPT_KEY=f3a1c9d7b8e45f92a6b1c3e4d5f7a8901234567890abcdef1234567890abcdef
EMAIL_HASH_SALT=9f4b2c7d8e1a3b5c6d7e8f901234567890abcdef1234567890abcdef12345678
GOOGLE_MAP_API_KEY=??
PLACES_NEARBY_URL=https://places.googleapis.com/v1/places:searchNearby
NODE_ENV=dev
PORT=5000
```

```sh
# SpringBoot-server Environment Variables
# Open PowerShell (Run as Administration) or Bash
setx SPRING_DATA_MONGODB_URI "<Your Mongo Server URL>" /M
setx SERVER_PORT "8080" /M
setx SPRING_SECRET_KEY "9f4b2c7d8e1a3b5c6d7e8f901234567890abcdef1234567890abcdef12345678" /M
setx SPRING_ENCRYPT_KEY "f3a1c9d7b8e45f92a6b1c3e4d5f7a8901234567890abcdef1234567890abcdef" /M
setx SPRING_ORIGINS_URL "http://localhost:5173" /M
```

### Frontend Setup (React)
```sh
cd client
yarn install
yarn dev
```

### Backend Setup (Express + Spring Boot)
```sh
# Navigate to node-server directory
cd node-server
npm install
npm run start:dev

# Navigate to booking-server directory from root
cd springboot-server
mvn clean install
mvn spring-boot:run
```

After starting the project, access the application at: http://localhost:5173

Frontend: port 5173

Express: port 5000

Spring Boot: port 8080

## 🤝 Contributing
Contributions are welcome! Fork the repository and create a pull request.
Feel free to modify and improve the project as needed. Happy coding! 🎉