import { Message } from "@/components/models/chat/Message";
import { clearMessageState, setMessageState, setInputValueState } from "@/state/supportSlice";
import { RootState } from "@/state/store"
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux"

const useSupport = () => {
    const supportState = useSelector((state: RootState) => state.support);
    const dispatch = useDispatch();

    const setMessages = (update: Message[] | ((prev: Message[]) => Message[])) => {
        dispatch(setMessageState(update));
    };

    const setInputValue = (value: string) => {
        dispatch(setInputValueState(value));
    };

    const clearMessages = () => {
        dispatch(clearMessageState());
    }

    return {
        supportState,
        setMessages,
        setInputValue,
        clearMessages
    }
}

export default useSupport;