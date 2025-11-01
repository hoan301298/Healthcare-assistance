import { Place } from "@/components/models/search/Place";
import { useQuery } from "@tanstack/react-query";
import { getPlaces } from "./requests/places";
import { useEffect, useMemo } from "react";
import { PlaceRequestDTO } from "@/components/models/DTO/PlaceRequestDTO";
import { getKey, getValue } from "@/components/helper/getKey";
import { RadiusType } from "@/components/models/search/RadiusType";
import { MedicalType } from "@/components/models/search/MedicalType";
import useSearch from "./useSearch";

const usePlaces = () => {
    const { search, setPlaces } = useSearch();
    const radiusKey = getKey(RadiusType, search.radiusType, "R");
    const primaryTypeKey = getKey(MedicalType, search.medicalType);

    const canFetch = !!(search.location && radiusKey && primaryTypeKey);

    const requestBody: PlaceRequestDTO = {
        location: search.location,
        radius: Number.parseInt(radiusKey),
        primaryType: primaryTypeKey
    }

    const { data, isLoading, error } = useQuery<Place[] | null, Error>({
        queryKey: ["places", search.location, search.medicalType, search.radiusType],
        queryFn: () => getPlaces(requestBody, search.address),
        enabled: canFetch,
        refetchOnWindowFocus: false,
        refetchOnMount: false,
        retry: false,
    })

    useEffect(() => {
        if (data && JSON.stringify(data) !== JSON.stringify(search.places)) {
            setPlaces(data);
        }
    }, [data, setPlaces]);

    const places = useMemo(() => {
        return (search.places ? [...search.places].map(place => {
            const primaryType = getValue(MedicalType, place.primaryType);
            return { ...place, primaryType: primaryType }
        }).sort((a, b) => a.distance - b.distance) : []);
    }, [search.places]);

    return { places, isLoading, error }
}

export default usePlaces;