import { Place } from "@/components/models/search/Place";
import { Location, MedicalType } from "@/components/models/search/PlaceProperties";
import { Filter, MapLocation, RadiusType } from "@/components/models/search/SearchProperties";
import { setFilters } from "@/state/searchSlice";
import { RootState } from "@/state/store";
import { useDispatch, useSelector } from "react-redux";

const useSearch = () => {
    const dispatch = useDispatch();
    const search = useSelector((state: RootState) => state.search);

    const setMedicalType = (type: MedicalType) => {
        dispatch(setFilters({ medicalType: type }));
    }

    const setRadiusType = (type: RadiusType) => {
        dispatch(setFilters({ radiusType: type }));
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

    const setSelectedPlace = (place: Place) => {
        dispatch(setFilters({ selectedPlace: place }));
    }

    const setFilter = (filter: Filter) => {
        dispatch(setFilters({ filter: filter }));
    }

    return {
        search,
        setAddress,
        setMedicalType,
        setSearchQuery,
        setRadiusType,
        setLocation,
        setMapLocation,
        setPlaces,
        setSelectedPlace,
        setFilter
    }
}

export default useSearch;