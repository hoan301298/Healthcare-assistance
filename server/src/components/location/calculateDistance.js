import { getDistance } from 'geolib';

export const fieldsNearBy = ["places"];

export const fieldsDetail = ['name','website','opening_hours','international_phone_number','user_ratings_total','rating','formatted_address'];

export const calculateDistance = (currentPosition, hospitalLocation) => {
    return getDistance(currentPosition, hospitalLocation);
}