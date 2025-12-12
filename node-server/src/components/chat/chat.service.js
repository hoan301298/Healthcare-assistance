import ChatDetail from "../../model/Chat.schema.js";

const chatService = async (user_id) => {
    try {
        let chatDetail = await ChatDetail.findOne({ user_id });

        if (!chatDetail) {
            chatDetail = await ChatDetail.create({
                user_id,
                messages: []
            });
        }

        return {
            success: true,
            message: "fetch successfully",
            chatDetail: {
                id: chatDetail._id,
                user_id: chatDetail.user_id,
                messages: chatDetail.messages,
            }
        };
    } catch (err) {
        console.error("ChatService error:", err);

        return {
            success: false,
            message: "Something went wrong",
            error: err.message
        };
    }
};

export default chatService;