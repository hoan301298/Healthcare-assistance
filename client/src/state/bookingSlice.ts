import { FormData } from "@/components/models/booking/FormData";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface BookingState {
    formData: FormData;
}

const initialState: BookingState = {
    formData: {
        hospital: null,
        name: '',
        email: '',
        date: '',
        phone: '',
        time: '',
        reason: '',
        notes: ''
    },
}

const bookingSlice = createSlice({
    name: 'booking',
    initialState,
    reducers: {
        setBookingForm: (state, action: PayloadAction<FormData>) => {
            state.formData = action.payload;
        },
        clearBookingForm: (state) => {
            state.formData = { ...initialState.formData };
        }
    }
});

export const { setBookingForm, clearBookingForm } = bookingSlice.actions;
export default bookingSlice.reducer;