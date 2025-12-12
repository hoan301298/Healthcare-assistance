import chatService from "./chat.service.js";

const chatController = async (req, res) => {
    const user = req.user;

    try {
        const response = await chatService(user._id);

        if (!response.success) {
            return res.status(400).json(response);
        }

        return res.status(200).json(response);
    } catch (err) {
        console.error("ChatController Error:", err);
        return res.status(500).json({
            success: false,
            message: "Server error"
        });
    }
};

export default chatController;