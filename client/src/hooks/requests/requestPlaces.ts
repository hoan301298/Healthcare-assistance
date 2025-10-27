import { Place } from "@/components/models/search/Place";
import { SearchState } from "@/state/searchSlice";
import axios from "axios";

export const getplaces = async (search: SearchState): Promise<Place[] | null> => {
    if (!search.location || search.address.trim() === '' || search.address === "Finland") return null;

    const requestBody = {
        location: search.location,
        center: search.selectedRadius
    };

    const location = search.location;

    try {
        const response = await axios.post<Place[]>('/v1/places', { location })
        return response.data;
    } catch (error) {
        console.error("Failed to fetch places:", error);
        return null;
    }
}