import { Place } from "@/components/models/search/Place";
import { SelectedRadius } from "@/components/models/search/SelectedRadius";
import { SearchState } from "@/state/searchSlice";
import axios from "axios";

export const getplaces = async (search: SearchState): Promise<Place[] | null> => {
    if (!search.location || search.address.trim() === '' || search.address === "Finland") return null;

    const radius = (Object.entries(SelectedRadius) as [string, string][])
                        .find(([key, value]) => value === search.selectedRadius)?.[0]
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