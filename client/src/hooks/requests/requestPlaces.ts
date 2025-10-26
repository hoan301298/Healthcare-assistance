import { Location } from "@/components/models/location/Location";
import { Place } from "@/components/models/place/Place";
import axios from "axios";

export const getplaces = async (location: Location): Promise<Place[] | null> => {
    if (!location) return null;

    try {
        const response = await axios.post<Place[]>('/v1/places', { location })

        return response.data;
    } catch (error) {
        console.error("Failed to fetch facilities:", error);
        return null;
    }
}