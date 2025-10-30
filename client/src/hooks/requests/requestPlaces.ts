import { PlaceRequestDTO } from "@/components/models/DTO/PlaceRequestDTO";
import { Place } from "@/components/models/search/Place";
import axios from "axios";

export const getplaces = async (requestBody : PlaceRequestDTO, address: string) : Promise<Place[] | null> => {
    if (address.trim() === '' || address === "Finland") return null;

    try {
        const response = await axios.post<Place[]>('/v1/places', requestBody)
        return response.data;
    } catch (error) {
        console.error("Failed to fetch places:", error);
        return null;
    }
}