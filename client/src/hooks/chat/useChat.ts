import { Message } from "@/components/models/chat/Message";
import { AppDispatch, RootState } from "@/state/store"
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux"
import { 
    clearChatState,
    setIsConnectedState,
    setMessageState, 
    setInputValueState, 
} from "@/state/chatSlice";
import { getChatDetail } from "@/state/thunks/chatThunks";
import { ChatDetailResponseDto } from "@/components/models/Dto/ChatDetailResponseDto";

const useChat = () => {
    const chatState = useSelector((state: RootState) => state.chat);
    const dispatch: AppDispatch = useDispatch();

    const setMessages = (update: Message[] | ((prev: Message[]) => Message[])) => {
        dispatch(setMessageState(update));
    };

    const setInputValue = (value: string) => {
        dispatch(setInputValueState(value));
    };

    const setIsConnected = (value: boolean) => {
        dispatch(setIsConnectedState(value));
    }

    const clearData = () => {
        dispatch(clearChatState());
    }

    const fetchChatDetail = async (): Promise<ChatDetailResponseDto> => {
        const result = await dispatch(getChatDetail());
    
        if (getChatDetail.fulfilled.match(result)) {
            return result.payload as ChatDetailResponseDto;
        }
    
        const errorMessage = 
            (result.payload as string) ||
            result.error?.message ||
            "Failed to fetch Chat_Detail";
    
        return {
            success: false,
            chatDetail: null,
            message: errorMessage
        };
    };
    
    return {
        chatDetail: chatState.chatDetail,
        inputValue: chatState.inputValue,
        isConnected: chatState.isConnected,

        fetchChatDetail,
        setMessages,
        setInputValue,
        setIsConnected,
        clearData
    }
}

export default useChat;