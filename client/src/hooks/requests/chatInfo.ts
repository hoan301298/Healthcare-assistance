import { ChatDetail } from "@/components/models/chat/ChatDetail";
import { ChatInfoRequestDTO } from "@/components/models/DTO/ChatInfoRequestDTO";
import axios from "axios";

export const getChatInfo = async (chatInfoReqeust: ChatInfoRequestDTO) : Promise<ChatDetail | null> => {
    const { username, email } = chatInfoReqeust;

    if (!username || !email) return null;

    try {
        const response = await axios.post('/v1/chat/info', {
            username,
            email
        });

        const { success, chatDetail } = response.data;
        if (success && chatDetail) {
            return chatDetail as ChatDetail;
        }

        return null;
    } catch (error) {
        console.error("Failed to get chat information:", error);
        return null;
    }
}