import axiosClient_v1 from "@/api/axiosClient_v1";
import { User } from "@/components/models/auth/User";
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
            const response = await axiosClient_v1.post<AuthResponseDto>('/auth/login', data);
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
            const response = await axiosClient_v1.post<AuthResponseDto>("/auth/register", data);
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || "Login failed");
        }
    }
);

export const checkAuth = createAsyncThunk<
    User,
    void,
    { rejectValue: null }
>(
    "auth/checkAuth",
    async (_, thunkAPI) => {
        try {
            const res = await axiosClient_v1.get<AuthResponseDto>("/auth/check");
            return res.data.user;
        } catch (error: any) {
            return thunkAPI.rejectWithValue(null);
        }
    }
);

export const logout = createAsyncThunk<
    boolean,
    void,
    { rejectValue: string }
>(
    "auth/logout",
    async (_, thunkAPI) => {
        try {
            await axiosClient_v1.post("/auth/logout");
            return true;
        } catch (error: any) {
            return thunkAPI.rejectWithValue("Logout failed");
        }
    }
);