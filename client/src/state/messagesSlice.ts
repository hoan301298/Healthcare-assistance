import { Message } from "@/components/models/chat/Message";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface MessageState {
    messages: Message[] | null;
    inputValue: string;
}

const initialState: MessageState = {
    messages: [
        {
            id: (Date.now() + Math.random()).toString(),
            text: 'Hello! I\'m your healthcare assistant. How can I help you today?',
            sender: 'bot',
            timestamp: new Date()
        }
    ],
    inputValue: ''
}

const messageSlice = createSlice({
    name: "messages",
    initialState,
    reducers: {
        setMessageState: (state, action: PayloadAction<Message[] | ((prev: Message[]) => Message[])>) => {
            if (typeof action.payload === 'function') {
                state.messages = action.payload(state.messages);
            } else {
                state.messages = action.payload;
            }
        },
        setInputValueState: (state, action: PayloadAction<string>) => {
            state.inputValue = action.payload;
        },
        clearMessageState: () => initialState,
    }
})

export const { setMessageState, setInputValueState, clearMessageState } = messageSlice.actions;
export default messageSlice.reducer;