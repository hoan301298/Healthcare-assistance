import axiosClient_v1 from "@/api/axiosClient_v1";
import { ChatDetailResponseDto } from "@/components/models/Dto/ChatDetailResponseDto";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const getChatDetail = createAsyncThunk<
    ChatDetailResponseDto,
    void,
    { rejectValue: string }
>(
    "chat",
    async (_, { rejectWithValue }) => {
        try {
            const res = await axiosClient_v1.get<ChatDetailResponseDto>('/chat');
            return res.data as ChatDetailResponseDto;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || "Fetch ChatDetail failed");
        }
    }
);