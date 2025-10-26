import { Place } from "@/components/models/place/Place";
import { useQuery } from "@tanstack/react-query";
import { getplaces } from "./requests/requestPlaces";
import { Location } from "@/components/models/location/Location";
import { useMemo } from "react";

const usePlaces = (location: Location) => {
    const { data, isLoading, error } = useQuery<Place[] | null, Error>({
        queryKey: ["places", location],
        queryFn: () => getplaces(location),
    })

    const places: Place[] = useMemo(() => {
        if (data.length > 0) {
            return data;
        }
        return null;
    }, [data, location]);

    return {
        places, isLoading, error
    }
}

export default usePlaces;