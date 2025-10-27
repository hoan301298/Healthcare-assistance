import { Place } from "@/components/models/search/Place";
import { useQuery } from "@tanstack/react-query";
import { getplaces } from "./requests/requestPlaces";
import { useEffect, useMemo } from "react";
import { SelectedType } from "@/components/models/search/SelectedType";
import useSearch from "./useSearch";

const usePlaces = () => {
    const { search, setPlaces } = useSearch();

    const { data, isLoading, error } = useQuery<Place[] | null, Error>({
        queryKey: ["places", search.location],
        queryFn: () => getplaces(search),
        enabled: !!search.location,
    })

    useEffect(() => {
        if (data && data.length > 0) {
            setPlaces(data);
        }
    }, [data, search?.address]);

    const places = useMemo(() => {
        return (search?.places ?? []).filter((place) => {
            const matchesType =
                search.selectedType === SelectedType.All || place.primaryType === search.selectedType;

            return matchesType;
        });
    }, [search?.places, search?.selectedType, search?.selectedRadius, search?.location]);

    return { places, isLoading, error }
}

export default usePlaces;