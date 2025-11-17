import { Message } from "./Message";

export interface ChatDetail {
    id: string;
    username: string;
    email: string;
    messages: Message[] | null;
}