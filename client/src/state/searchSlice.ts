import { Place } from '@/components/models/search/Place';
import { Location, MapLocation, MedicalType, RadiusType } from '@/components/models/search/Properties';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface SearchState {
  medicalType: MedicalType;
  radiusType: RadiusType;
  address: string;
  searchQuery: string;
  location: Location | null;
  mapLocation: MapLocation;
  places: Place[];
  selectedPlace: Place;
}

export const defaultMapLocation: MapLocation = {
  center: {
    lat: 60.192059,
    lng: 24.945831
  },
  zoom: 6
}

const initialState: SearchState = {
  medicalType: MedicalType.hospital,
  radiusType: RadiusType.R1000,
  address: 'Finland',
  searchQuery: '',
  location: null,
  mapLocation: defaultMapLocation,
  places: [],
  selectedPlace: null,
};

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setFilters: (state, action: PayloadAction<Partial<SearchState>>) => {
      Object.assign(state, action.payload);
    },
    clearFilters: () => initialState,
  },
});

export const { setFilters, clearFilters } = searchSlice.actions;
export default searchSlice.reducer;