import { Filter } from "../models/search/Properties";
import { Place } from "../models/search/Place";

export const filteredPlaces = (places: Place[], filter: Filter) => {

    if (!places) return [];

    const sortedPlaces = [...places].map(place => ({
        ...place,
        rating: place.rating ?? 0,
        reviews: place.reviews ?? []
    }));
    
    switch (filter) {
        case Filter.distance:
            return sortedPlaces.sort((a, b) => a.distance - b.distance);
        case Filter.rating:
            return sortedPlaces.sort((a, b) => b.rating - a.rating);
        case Filter.review:
            return sortedPlaces.sort((a, b) => b.reviews.length - a.reviews.length);
        default:
            return sortedPlaces;
    }

}