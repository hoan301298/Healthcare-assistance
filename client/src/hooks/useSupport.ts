import { Message } from "@/components/models/chat/Message";
import { clearSupportState, setIsVerified, setChatDetailState, setMessageState, setInputValueState } from "@/state/supportSlice";
import { RootState } from "@/state/store"
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux"
import { ChatDetail } from "@/components/models/chat/ChatDetail";

const useSupport = () => {
    const supportState = useSelector((state: RootState) => state.support);
    const dispatch = useDispatch();

    const setChatDetail = (chatDetail: ChatDetail) => {
        dispatch(setChatDetailState(chatDetail));
    }

    const setVerified = (value: boolean) => {
        dispatch(setIsVerified(value));
    }

    const setMessages = (update: Message[] | ((prev: Message[]) => Message[])) => {
        dispatch(setMessageState(update));
    };

    const setInputValue = (value: string) => {
        dispatch(setInputValueState(value));
    };

    const clearData = () => {
        dispatch(clearSupportState());
    }

    return {
        supportState,
        setChatDetail,
        setVerified,
        setMessages,
        setInputValue,
        clearData
    }
}

export default useSupport;