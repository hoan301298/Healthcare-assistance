import dotenv from 'dotenv';
dotenv.config();

export const constants = {
    APIKEY: process.env.GOOGLE_MAP_API_KEY,
    MONGO_URL: process.env.MONGO_URL,
    SECRET_KEY: process.env.SECRET_KEY,
    PLACES_NEARBY_URL: process.env.PLACES_NEARBY_URL,
    PLACE_DETAIL_URL: process.env.PLACE_DETAIL_URL,
    ORIGIN_URL: process.env.ORIGIN_URL,
    PORT: process.env.PORT,
    NODEMAILER_API_KEY: process.env.NODEMAILER_API_KEY,
    ENCRYPT_KEY: process.env.ENCRYPT_KEY,
    EMAIL_HASH_SALT: process.env.EMAIL_HASH_SALT,
    PASSWORD_HASH_SALT: process.env.PASSWORD_HASH_SALT,
};