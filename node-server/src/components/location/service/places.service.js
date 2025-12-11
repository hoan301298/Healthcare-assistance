import axios from 'axios';
import { calculateDistance } from '../../helper/calculateDistance.js';
import { constants } from '../../../constant.js';
import { fields } from '../../helper/calculateDistance.js';

const placesService = async (location, radius, primaryType) => {
  const fieldsByString = fields.map(f => `places.${f}`).join(',');

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
          "X-Goog-FieldMask": fieldsByString,
        },
      }
    );
    if (!response.data.places) return [];
    const places = response.data.places
      .filter(place => place.internationalPhoneNumber || place.websiteUri)
      .map(place => ({
      ...place,
      distance: calculateDistance(location, place.location)
    }));
  
    return places;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};

export default placesService;