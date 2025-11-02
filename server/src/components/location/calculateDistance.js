import { getDistance } from 'geolib';

export const fieldsNearBy = ["places"];

export const calculateDistance = (currentPosition, hospitalLocation) => {
    return getDistance(currentPosition, hospitalLocation);
}