import placesService from '../services/places.service.js';

const placesController = async (req, res) => {
    const { location, radius, primaryType } = req.body;

    if (!location || !radius || !primaryType) {
        return res.status(400).json({ message: 'All Fields are required' });
    }

    try {
        const response = await placesService(location, radius, primaryType);
        return res.status(200).json(response);
    } catch (error) {
        console.error('Error fetching hospitals:', error);
        return res.status(500).json({ message: 'Internal server error', error: error.message });
    }
};

export default placesController;