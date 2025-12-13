import { Message } from "@/components/models/chat/Message";
import { AppDispatch, RootState } from "@/state/store"
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux"
import { 
    clearSupportState, 
    setMessageState, 
    setInputValueState, 
} from "@/state/supportSlice";
import { getChatDetail } from "@/state/thunks/chatThunks";
import { ChatDetailResponseDto } from "@/components/models/Dto/ChatDetailResponseDto";

const useSupport = () => {
    const supportState = useSelector((state: RootState) => state.support);
    const dispatch: AppDispatch = useDispatch();

    const setMessages = (update: Message[] | ((prev: Message[]) => Message[])) => {
        dispatch(setMessageState(update));
    };

    const setInputValue = (value: string) => {
        dispatch(setInputValueState(value));
    };

    const clearData = () => {
        dispatch(clearSupportState());
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
        chatDetail: supportState.chatDetail,
        inputValue: supportState.inputValue,

        fetchChatDetail,
        setMessages,
        setInputValue,
        clearData
    }
}

export default useSupport;