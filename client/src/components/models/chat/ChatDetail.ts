import { Message } from "./Message";

export interface ChatDetail {
    id: string;
    user_id: string;
    username: string;
    messages: Message[] | null;
}