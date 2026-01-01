import axiosClient_v1 from "@/api/axiosClient_v1";
import { PlaceRequestDTO } from "@/components/models/Dto/PlaceRequestDTO";
import { Place } from "@/components/models/search/Place";

export const getPlaces = async (requestBody : PlaceRequestDTO, address: string) : Promise<Place[] | null> => {
    if (address.trim() === '' || address === "Finland") return null;

    try {
        const response = await axiosClient_v1.post<Place[]>('/places', requestBody)
        return response.data;
    } catch (error) {
        console.error("Failed to fetch places:", error);
        return null;
    }
}