import { ChatDetail } from "../chat/ChatDetail";

export interface ChatDetailResponseDto {
    chatDetail?: ChatDetail;
    success: boolean;
    message: string;
}