import axios from 'axios';
import { constants } from '../../constant.js';
import { fieldsNearBy, fieldsDetail } from './calculateDistance.js';

const placesService = async (location, radius, primaryType) => {
  try {
    const response = await axios.post(
      constants.PLACES_NEARBY_URL,
      {
        includedPrimaryTypes: [primaryType],
        locationRestriction: {
          circle: {
            center: location,
            radius: radius,
          },
        },
      },
      {
        headers: {
          "Content-Type": "application/json",
          "X-Goog-Api-Key": constants.APIKEY,
          "X-Goog-FieldMask": fieldsNearBy,
        },
      }
    );
    const placeIds = response.data.places?.filter(place => place.internationalPhoneNumber || place.websiteUri) ?? [];
    
    console.log(placeIds);
    const places = await Promise.all(
      placeIds.map( async (place) => {
        const detail = await detailRequest(place.id);
        return {...place, detail};
      })
    );
    return places;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};

const detailRequest = async (place_id) => {
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

export default placesService;