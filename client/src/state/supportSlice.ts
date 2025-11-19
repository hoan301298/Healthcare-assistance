import { ChatDetail } from "@/components/models/chat/ChatDetail";
import { Message } from "@/components/models/chat/Message";
import { ChatInfoRequestDTO } from "@/components/models/DTO/ChatInfoRequestDTO";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface SupportState {
    chatDetail: ChatDetail | null;
    isVerified: boolean;
    inputValue: string;
    chatRequest: ChatInfoRequestDTO
}

const initialState: SupportState = {
    chatDetail: null,
    isVerified: false,
    inputValue: '',
    chatRequest: {
        username: '',
        email: ''
    }
}

const supportSlice = createSlice({
    name: "support",
    initialState,
    reducers: {
        setChatDetailState: (state, action: PayloadAction<ChatDetail>) => {
            state.chatDetail = action.payload;
        },
        setMessageState: (state, action: PayloadAction<Message[] | ((prev: Message[]) => Message[])>) => {
            if (typeof action.payload === 'function') {
                state.chatDetail.messages = action.payload(state.chatDetail.messages);
            } else {
                state.chatDetail.messages = action.payload;
            }
        },
        setIsVerified: (state, action: PayloadAction<boolean>) => {
            state.isVerified = action.payload;
        },
        setInputValueState: (state, action: PayloadAction<string>) => {
            state.inputValue = action.payload;
        },
        setChatRequest: (state, action: PayloadAction<Partial<ChatInfoRequestDTO>>) => {
            Object.assign(state.chatRequest, action.payload);
        },
        clearSupportState: () => initialState,
    }
})

export const { setChatDetailState, setMessageState, setIsVerified ,setInputValueState, setChatRequest, clearSupportState } = supportSlice.actions;
export default supportSlice.reducer;