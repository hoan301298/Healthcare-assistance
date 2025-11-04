import { FormData } from "@/components/models/booking/FormData";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface BookingState {
    formData: FormData;
}

const initialState: BookingState = {
    formData: null,
}

const bookingSlice = createSlice({
    name: 'booking',
    initialState,
    reducers: {
        setFilters: (state, action: PayloadAction<Partial<BookingState>>) => {
            Object.assign(state, action.payload);
        },
        clearFilters: () => initialState,
    }
});

export const { setFilters, clearFilters } = bookingSlice.actions;
export default bookingSlice.reducer;