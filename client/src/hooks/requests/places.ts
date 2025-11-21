import { PlaceRequestDTO } from "@/components/models/Dto/PlaceRequestDTO";
import { Place } from "@/components/models/search/Place";
import axios from "axios";

export const getPlaces = async (requestBody : PlaceRequestDTO, address: string) : Promise<Place[] | null> => {
    if (address.trim() === '' || address === "Finland") return null;

    try {
        const response = await axios.post<Place[]>('/v1/places', requestBody)
        return response.data;
    } catch (error) {
        console.error("Failed to fetch places:", error);
        return null;
    }
}