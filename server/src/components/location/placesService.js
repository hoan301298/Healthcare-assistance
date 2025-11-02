import axios from 'axios';
import { constants } from '../../constant.js';
import { fieldsNearBy } from './calculateDistance.js';

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

    const places = response.data.places?.filter(place => place.internationalPhoneNumber || place.websiteUri) ?? [];
    
    if (places.length > 0) {
      places.map(place => ({
        ...place,
        distance: calculateDistance(location, place.location)
      }));
    }
    
    return places;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};

export default placesService;