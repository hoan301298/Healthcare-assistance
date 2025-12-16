import axiosClient_v1 from "@/api/axiosClient_v1";
import { AuthResponseDto } from "@/components/models/Dto/AuthResponseDto";
import { LoginRequestDto } from "@/components/models/Dto/LoginRequestDto";
import { RegisterRequestDto } from "@/components/models/Dto/RegisterRequestDto";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const login = createAsyncThunk<
    AuthResponseDto,
    LoginRequestDto,
    { rejectValue: string }
>(
    "auth/login",
    async (data, { rejectWithValue }) => {
        try {
            const response = await axiosClient_v1.post<AuthResponseDto>('/profile/auth/login', data);
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || "Login failed");
        }
    }
);

export const register = createAsyncThunk<
    AuthResponseDto,
    RegisterRequestDto,
    { rejectValue: string }
>(
    "auth/register",
    async (data, { rejectWithValue }) => {
        try {
            const response = await axiosClient_v1.post<AuthResponseDto>("/profile/auth/register", data);
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || "Register failed");
        }
    }
);

export const checkAuth = createAsyncThunk<
    AuthResponseDto,
    void,
    { rejectValue: null }
>(
    "auth/checkAuth",
    async (_, thunkAPI) => {
        try {
            const response = await axiosClient_v1.get<AuthResponseDto>("/profile/auth/check");
            return response.data;
        } catch (error: any) {
            return thunkAPI.rejectWithValue(null);
        }
    }
);

export const logout = createAsyncThunk<
    AuthResponseDto,
    void,
    { rejectValue: string }
>(
    "auth/logout",
    async (_, thunkAPI) => {
        try {
            const response = await axiosClient_v1.get<AuthResponseDto>("/profile/auth/logout");
            return response.data;
        } catch (error: any) {
            return thunkAPI.rejectWithValue("Logout failed");
        }
    }
);