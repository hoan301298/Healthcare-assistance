import { Place } from "@/components/models/search/Place";
import { useQuery } from "@tanstack/react-query";
import { getPlaces } from "../requests/places";
import { useEffect, useMemo } from "react";
import { PlaceRequestDTO } from "@/components/models/Dto/PlaceRequestDTO";
import { getKey } from "@/components/helper/KeyValue";
import { MedicalType } from "@/components/models/search/PlaceProperties";
import { filteredPlaces } from "@/components/helper/filteredPlaces";
import { RadiusType } from "@/components/models/search/SearchProperties";
import useSearch from "../search/useSearch";

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
        return (search.places ? filteredPlaces(search.places, search.filter) : []);
    }, [search.places, search.filter]);

    return { places, isLoading, error }
}

export default usePlaces;