import { Location } from "@/components/models/search/Location";
import { MapLocation } from "@/components/models/search/MapLocation";
import { Place } from "@/components/models/search/Place";
import { SelectedRadius } from "@/components/models/search/SelectedRadius";
import { SelectedType } from "@/components/models/search/SelectedType";
import { setFilters } from "@/state/searchSlice";
import { RootState } from "@/state/store";
import { useDispatch, useSelector } from "react-redux"

const useSearch = () => {
    const dispatch = useDispatch();
    const search = useSelector((state: RootState) => state.search);

    const setSelectedType = (type: SelectedType) => {
        dispatch(setFilters({ selectedType: type }));
    }

    const setSelectedRadius = (radius: SelectedRadius) => {
        dispatch(setFilters({ selectedRadius: radius}));
    }

    const setSearchQuery = (query: string) => {
        dispatch(setFilters({ searchQuery: query }));
    }

    const setAddress = (address: string) => {
        dispatch(setFilters({ address: address }));
    }

    const setLocation = (location: Location) => {
        dispatch(setFilters({ location: location }));
    }

    const setMapLocation = (mapLocation: MapLocation) => {
        dispatch(setFilters({ mapLocation: mapLocation }));
    }

    const setPlaces = (places: Place[]) => {
        dispatch(setFilters({ places: places }));
    }

    return {
        search,
        setAddress,
        setSelectedRadius,
        setSearchQuery,
        setSelectedType,
        setLocation,
        setMapLocation,
        setPlaces,
    }
}

export default useSearch;