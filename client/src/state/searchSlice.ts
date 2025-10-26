import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface SearchState {
  selectedType: string;
  address: string;
  searchQuery: string;
}

const initialState: SearchState = {
  selectedType: '',
  address: '',
  searchQuery: '',
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