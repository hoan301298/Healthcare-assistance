import { calculateDistance } from './calculateDistance.js';
import placesService from './placesService.js';

const placesController = async (req, res) => {
    const location = req.body.location;

    if (!location || !location.center) {
        return res.status(400).json({ message: 'Location is required' });
    }

    try {
        const response = await placesService(location.center);

        // Check if Google returned results
        const places = response;
        if (places.length === 0) {
            return res.status(404).json({ message: 'No places found nearby' });
        }

        const enrichedPlaces = places.map(place => ({
          ...place,
          distance: calculateDistance(location.center, place.location)
        }));

        res.json(enrichedPlaces);
    } catch (error) {
        console.error('Error fetching hospitals:', error);
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
};

export default placesController;