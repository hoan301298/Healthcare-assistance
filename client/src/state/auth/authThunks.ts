import axiosClient_v1 from "@/api/axiosClient_v1";
import { User } from "@/components/models/auth/User";
import { LoginRequestDto } from "@/components/models/Dto/LoginRequestDto";
import { SignUpRequestDto } from "@/components/models/Dto/SignUpRequestDto";
import { createAsyncThunk } from "@reduxjs/toolkit";

interface AuthSuccessResponse {
    success: boolean;
    message: string;
    user: User;
}

interface ErrorResponse {
    success: false;
    message: string;
}

export const login = createAsyncThunk<
    User,
    LoginRequestDto,
    { rejectValue: string }
>(
    "auth/login",
    async (data, thunkAPI) => {
        try {
            const res = await axiosClient_v1.post<AuthSuccessResponse>("/auth/login", data);
            return res.data.user;
        } catch (error) {
            const errData = error.response?.data as ErrorResponse;
            return thunkAPI.rejectWithValue(errData.message);
        }
    }
);

export const register = createAsyncThunk<
    User,
    SignUpRequestDto,
    { rejectValue: string }
>(
    "auth/register",
    async (data, thunkAPI) => {
        try {
            const res = await axiosClient_v1.post<AuthSuccessResponse>("/auth/register", data);
            return res.data.user
        } catch (error) {
            const errData = error.response?.data as ErrorResponse;
            return thunkAPI.rejectWithValue(errData.message);
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
            const res = await axiosClient_v1.get<AuthSuccessResponse>("/auth/me");
            return res.data.user;
        } catch (error) {
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
        } catch (err: any) {
            return thunkAPI.rejectWithValue("Logout failed");
        }
    }
);