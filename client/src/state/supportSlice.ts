import { ChatDetail } from "@/components/models/chat/ChatDetail";
import { Message } from "@/components/models/chat/Message";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface SupportState {
    chatDetail: ChatDetail;
    isVerified: boolean;
    inputValue: string;
}

const initialState: SupportState = {
    chatDetail: {
        id: '',
        username: '',
        messages: [{
            id: (Date.now() + Math.random()).toString(),
            text: 'I\'m here to support you. Tell me what you need!',
            sender: 'bot',
            timestamp: new Date()
        }],
        email: '',
    },
    isVerified: false,
    inputValue: ''
}

const supportSlice = createSlice({
    name: "support",
    initialState,
    reducers: {
        setChatDetailState: (state, action: PayloadAction<Partial<ChatDetail>>) => {
            Object.assign(state.chatDetail, action.payload);
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
        clearSupportState: () => initialState,
    }
})

export const { setChatDetailState, setMessageState, setIsVerified ,setInputValueState, clearSupportState } = supportSlice.actions;
export default supportSlice.reducer;