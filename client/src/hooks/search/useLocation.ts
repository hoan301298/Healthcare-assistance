import { useEffect, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { getGeoCode } from "@/hooks/requests/geocode";
import { GeoCodeResponseDTO } from "@/components/models/Dto/GeoCodeDTO";
import { defaultMapLocation } from "@/state/searchSlice";
import { MapLocation } from "@/components/models/search/SearchProperties";
import useSearch from "../search/useSearch";

export const useLocation = () => {
    const { search, setMapLocation, setLocation } = useSearch();

    const { data, isLoading, error } = useQuery<GeoCodeResponseDTO | null, Error>({
        queryKey: ["geocode", search.address],
        queryFn: () => getGeoCode(search.address),
        enabled: !!search.address,
        refetchOnWindowFocus: false,
    });
    
    useEffect(() => {
        if (data?.geometry?.location) {
            setLocation({
                latitude: data.geometry.location.lat,
                longitude: data.geometry.location.lng
            })
            setMapLocation({
                center: data.geometry.location,
                zoom: search.address.trim() === "" || search.address.trim() === "Finland" ? 6 : 13,
            })
        }
    }, [data, search?.address])

    const mapLocation: MapLocation = useMemo(() => {
        if (data?.geometry?.location) {
            return {
                center: data.geometry.location,
                zoom: search.address.trim() === "" || search.address.trim() === "Finland" ? 6 : 13,
            }
        }
        return defaultMapLocation;
    }, [data, search?.address]);

    return { mapLocation, isLoading, error };
};