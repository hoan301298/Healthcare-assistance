import { Place } from "@/components/models/search/Place";
import { useQuery } from "@tanstack/react-query";
import { getplaces } from "./requests/requestPlaces";
import { useEffect, useMemo } from "react";
import { MedicalType } from "@/components/models/search/MedicalType";
import useSearch from "./useSearch";

const usePlaces = () => {
    const { search, setPlaces } = useSearch();

    const { data, isLoading, error } = useQuery<Place[] | null, Error>({
        queryKey: ["places", search.location, search.medicalType],
        queryFn: () => getplaces(search),
        enabled: !!search.location,
    })

    useEffect(() => {
        if (data && data.length > 0) {
            setPlaces(data);
        }
    }, [data]);

    const places = useMemo(() => {
        return (search?.places ?? []).filter((place) => {
            const matchesType =
                search.medicalType === MedicalType.All || place.primaryType === search.medicalType;

            return matchesType;
        });
    }, [search?.places, search?.medicalType, search?.medicalType, search?.location]);

    return { places, isLoading, error }
}

export default usePlaces;