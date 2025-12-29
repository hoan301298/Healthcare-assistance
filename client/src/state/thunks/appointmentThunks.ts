import axiosClient_v1 from "@/api/axiosClient_v1";
import { AppointmentsResponseDto } from "@/components/models/appointment/AppointmentsResponseDto";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const getAllAppointmentByAuth = createAsyncThunk<
    AppointmentsResponseDto,
    void,
    { rejectValue: string }
>(
    "appointment",
    async (_, { rejectWithValue }) => {
        try {
            const response = await axiosClient_v1.get<AppointmentsResponseDto>("/appointments");
            return response.data as AppointmentsResponseDto;
        } catch (error) {
            console.error("Something went wrong", error);
            return rejectWithValue(error.response?.data?.message || "Fail to fetch appointmnets");
        }
    }
)