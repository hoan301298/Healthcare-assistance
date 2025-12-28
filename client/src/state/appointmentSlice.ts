import { Appointment } from "@/components/models/appointment/Appointment";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getAllAppointmentByAuth } from "./thunks/appointmentThunks";
import { AppointmentsResponseDto } from "@/components/models/appointment/AppointmentsResponseDto";

interface AppointmentState {
    referenceId: string;
    email: string;
    singleAppointment: Appointment | null;
    success: boolean;
    message: string;
    authAppointments: Appointment[] | null;
}

const initialState: AppointmentState = {
    referenceId: '',
    email: '',
    singleAppointment: null,
    success: false,
    message: '',
    authAppointments: null,
}

const appointmentSlice = createSlice({
    name: "appointment",
    initialState,
    reducers: {
        setFilters: (state, action: PayloadAction<Partial<AppointmentState>>) => {
            Object.assign(state, action.payload)
        },
        clearFilters: () => initialState,
    },
    extraReducers: (builder => {
        builder.addCase(getAllAppointmentByAuth.fulfilled, (state, action: PayloadAction<AppointmentsResponseDto>) => {
            state.authAppointments = action.payload.appointments;
            state.success = action.payload.success;
            state.message = action.payload.message;
        });

        builder.addCase(getAllAppointmentByAuth.rejected, (state, action) => {
            state.authAppointments = null;
            state.success = false;
            state.message = action.payload as string;
        });
    })
})

export const { setFilters, clearFilters } = appointmentSlice.actions;
export default appointmentSlice.reducer;