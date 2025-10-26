import { GeoCodeResponseDTO } from "@/components/models/DTO/GeoCodeDTO";
import { geocodeURL, mapApiKey } from "@/constant";
import axios from "axios";

export const getGeoCode = async (address: string = "Finland"): Promise<GeoCodeResponseDTO | null> => {
    try {
        const location = address.trim() || "Finland";

        const res = await axios.get(geocodeURL, {
            params: {
                address: location,
                key: mapApiKey,
            },
        });

        if (res.status === 200 && res.data.results?.length > 0) {
            return res.data.results[0];
        }

        return null;
    } catch (error) {
        console.error("Error fetching geocode:", error);
        return null;
    }
};