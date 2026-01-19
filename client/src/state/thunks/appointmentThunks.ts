import axiosClient_v1 from "@/api/axiosClient_v1";
import axiosClient_v2 from "@/api/axiosClient_v2";
import { AppointmentsResponseDto } from "@/components/models/appointment/AppointmentsResponseDto";
import { AppointmentRequestDto } from "@/components/models/Dto/AppointmentDeleteRequestDto";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const getAllAppointmentByAuth = createAsyncThunk<
    AppointmentsResponseDto,
    void,
    { rejectValue: string }
>(
    "get_auth_appointments",
    async (_, { rejectWithValue }) => {
        try {
            const response = await axiosClient_v1
                .get<AppointmentsResponseDto>("/appointments");

            return response.data as AppointmentsResponseDto;
        } catch (error) {
            console.error("Something went wrong", error);
            return rejectWithValue(error.response?.data?.message || "Fail to fetch appointmnets");
        }
    }
)

export const deleteAppointmentByAuth = createAsyncThunk<
    AppointmentsResponseDto,
    AppointmentRequestDto,
    { rejectValue: string }
>(
    "delete_auth_appointment",
    async (value, { rejectWithValue }) => {
        try {
            const { email, id } = value;
            const response = await axiosClient_v2
                .delete<AppointmentsResponseDto>(`/${email}/${id}`);

            return response.data as AppointmentsResponseDto;
        } catch (error) {
            console.error("Something went wrong", error);
            return rejectWithValue(error.response?.data.message || "Fail to delete appointment");
        }
    }
)