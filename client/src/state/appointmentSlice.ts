import { Appointment } from "@/components/models/appointment/Appointment";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AppointmentState {
    referenceId: string;
    email: string;
    fetchedAppointment: Appointment;
}

const initialState: AppointmentState = {
    referenceId: '',
    email: '',
    fetchedAppointment: null
}

const appointmentSlice = createSlice({
    name: "appointment",
    initialState,
    reducers: {
        setFilters: (state, action: PayloadAction<Partial<AppointmentState>>) => {
            Object.assign(state, action.payload)
        },
        clearFilters: () => initialState,
    }
})

export const { setFilters, clearFilters } = appointmentSlice.actions;
export default appointmentSlice.reducer;