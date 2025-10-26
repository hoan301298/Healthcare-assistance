import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { getGeoCode } from "@/hooks/requests/requestGeocode";
import { GeoCodeResponseDTO } from "@/components/models/DTO/GeoCodeDTO";
import { MapLocation } from "@/components/models/location/MapLocation";

const defaultProps: MapLocation = {
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
        queryFn: () => getGeoCode(locationQuery),
    });

    const mapLocation: MapLocation = useMemo(() => {
        if (data?.geometry?.location) {
            return {
                center: data.geometry.location,
                zoom: !address || address.trim() === "" ? 6 : 13,
            }
        }
        return defaultProps;
    }, [data, address]);

    return { mapLocation, isLoading, error };
};