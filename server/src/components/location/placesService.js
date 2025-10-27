import axios from 'axios';
import { constants } from '../../constant.js';
import { detailRequest, fieldsNearBy } from './calculateDistance.js';

const placesService = async (location) => {
  try {
    const response = await axios.post(
      constants.PLACES_NEARBY_URL,
      {
        includedPrimaryTypes: ["chiropractor", "physiotherapist", "drugstore"],
        locationRestriction: {
          circle: {
            center: location,
            radius: 5000.0,
          },
        },
      },
      {
        headers: {
          "Content-Type": "application/json",
          "X-Goog-Api-Key": constants.APIKEY,
          "X-Goog-FieldMask": fieldsNearBy.join(","),
        },
      }
    );
    const placeIds = response.data.places || [];
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

export default placesService;