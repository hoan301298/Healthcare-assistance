import { getDistance } from 'geolib';
import { constants } from '../../constant.js';
import axios from 'axios';

export const fieldsNearBy = ["places.id","places.formattedAddress", "places.location","places.primaryType","places.rating"];

export const fieldsDetail = ['name','website','opening_hours','international_phone_number','user_ratings_total'];

export const calculateDistance = (currentPosition, hospitalLocation) => {
    return getDistance(currentPosition, hospitalLocation);
}

export const detailRequest = async (place_id) => {
    try {
        const response = await axios.get(constants.PLACE_DETAIL_URL, {
            params: {
                key: constants.APIKEY,
                place_id: place_id,
                fields: fieldsDetail.join(',')
            }
        })
        return response.data.result || {};
    } catch (error) {
        console.error('Error fetching details: ', error);
        throw error;
    }
};