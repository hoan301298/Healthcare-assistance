import { Location } from '@/components/models/search/Location';
import { MapLocation } from '@/components/models/search/MapLocation';
import { Place } from '@/components/models/search/Place';
import { SelectedRadius } from '@/components/models/search/SelectedRadius';
import { SelectedType } from '@/components/models/search/SelectedType';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface SearchState {
  selectedType: SelectedType;
  selectedRadius: SelectedRadius;
  address: string;
  searchQuery: string;
  location: Location | null;
  mapLocation: MapLocation;
  places: Place[] | null;
}

export const defaultMapLocation: MapLocation = {
  center: {
    lat: 60.192059,
    lng: 24.945831
  },
  zoom: 6
}

const initialState: SearchState = {
  selectedType: SelectedType.All,
  selectedRadius: SelectedRadius.R3000,
  address: 'Finland',
  searchQuery: '',
  location: null,
  mapLocation: defaultMapLocation,
  places: null,
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