import { Message } from "@/components/models/chat/Message";
import { clearMessageState, setMessageState, setInputValueState } from "@/state/messagesSlice";
import { RootState } from "@/state/store"
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux"

const useMessages = () => {
    const messageState = useSelector((state: RootState) => state.messages);
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
        messageState,
        setMessages,
        setInputValue,
        clearMessages
    }
}

export default useMessages;