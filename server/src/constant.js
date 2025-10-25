import dotenv from 'dotenv';
dotenv.config();

const constants = {
    APIKEY: process.env.GOOGLE_MAP_API_KEY,
    MONGO_URL: process.env.MONGO_URL,
    SECRET_KEY: process.env.SECRET_KEY,
    ENCRYPT_KEY: process.env.ENCRYPT_KEY,
    PLACES_NEARBY_URL: 'https://places.googleapis.com/v1/places:searchNearby',
    PLACE_DETAIL_URL: 'https://maps.googleapis.com/maps/api/place/details/json',
};

export default constants;