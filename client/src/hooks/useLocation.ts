import { useQuery } from "@tanstack/react-query";
import { fetchGeoCode } from "@/hooks/request";
import { GeoCodeResponseDTO } from "@/components/models/DTO/GeoCodeDTO";
import { useMemo } from "react";

interface LocationProps {
    center: google.maps.LatLngLiteral;
    zoom: number;
}

// Finland lat-lng
const DEFAULT_LOCATION : LocationProps = {
    center: {
        lat: 61.92410999999999,
        lng: 25.748151
    },
    zoom: 6
}

export const useLocation = (address: string) => {
    const locationQuery = address && address.trim() !== "" ? address : "Finland";

    const { data, isLoading, error } = useQuery<GeoCodeResponseDTO | null, Error>({
        queryKey: ["geocode", locationQuery],
        queryFn: () => fetchGeoCode(locationQuery),
    });

    const location = useMemo(() => {
        if (data?.geometry?.location) {
            return {
                center: data.geometry.location,
                zoom: !address || address.trim() === "" ? 6 : 13,
            } as LocationProps;
        }
        return DEFAULT_LOCATION;
      }, [data, address]);

return { location, data, isLoading, error };
};