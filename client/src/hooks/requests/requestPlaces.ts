import { Place } from "@/components/models/search/Place";
import { RadiusType } from "@/components/models/search/RadiusType";
import { SearchState } from "@/state/searchSlice";
import axios from "axios";

export const getplaces = async (search: SearchState): Promise<Place[] | null> => {
    if (!search.location || search.address.trim() === '' || search.address === "Finland") return null;

    const radius = (Object.entries(RadiusType) as [string, string][])
                        .find(([key, value]) => value === search.radiusType)?.[0]
                        .split('R')[1];

    const request = {
        location: search.location,
        radius: radius,
    };

    try {
        const response = await axios.post<Place[]>('/v1/places', request)
        return response.data;
    } catch (error) {
        console.error("Failed to fetch places:", error);
        return null;
    }
}