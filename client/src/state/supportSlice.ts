import { ChatDetail } from "@/components/models/chat/ChatDetail";
import { Message } from "@/components/models/chat/Message";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getChatDetail } from "./thunks/chatThunks";
import { ChatDetailResponseDto } from "@/components/models/Dto/ChatDetailResponseDto";

interface SupportState {
    chatDetail: ChatDetail | null;
    success: boolean;
    loading: boolean;
    message: string;
    error: string | null;
    inputValue: string;
}

const initialState: SupportState = {
    chatDetail: null,
    inputValue: '',
    loading: false,
    success: false,
    message: '',
    error: null,
}

const supportSlice = createSlice({
    name: "support",
    initialState,
    reducers: {
        setMessageState: (state, action: PayloadAction<Message[] | ((prev: Message[]) => Message[])>) => {
            if (typeof action.payload === 'function') {
                state.chatDetail.messages = action.payload(state.chatDetail.messages);
            } else {
                state.chatDetail.messages = action.payload;
            }
        },
        setInputValueState: (state, action: PayloadAction<string>) => {
            state.inputValue = action.payload;
        },
        clearSupportState: () => initialState,
    },
    extraReducers: (builder) => {
        builder.addCase(getChatDetail.pending, (state) => {
            state.loading = true;
            state.success = false;
            state.message = '';
            state.error = null;
        });

        builder.addCase(getChatDetail.fulfilled, (state, action: PayloadAction<ChatDetailResponseDto>) => {
            state.chatDetail = action.payload.chatDetail;
            state.message = action.payload.message;
            state.success = action.payload.success;
            state.error = null;
            state.loading = false;
        })

        builder.addCase(getChatDetail.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload as string;
            state.message = action.payload as string;
            state.success = false;
        })
    }
})

export const { setMessageState, setInputValueState, clearSupportState } = supportSlice.actions;
export default supportSlice.reducer;