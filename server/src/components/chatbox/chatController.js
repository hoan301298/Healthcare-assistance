import { decrypt, encrypt, hashEmailForLookup } from "../helper/cryptoFunctions.js";
import ChatDetail from "../model/ChatDetail.js";

const chatController = async (req, res) => {
    const { username, email } = req.body;

    if (!username || !email) {
        return res.status(404).json({message: "Request body missing"});
    }
    
    try {
        const hashedEmail = hashEmailForLookup(email);

        let chat = await ChatDetail.findOne({ hashedEmail });
        
        if (!chat) {
            chat = new ChatDetail({ 
                username,
                hashedEmail,
                encryptedEmail: encrypt(email),
                messages: []
            });
            await chat.save();
        }
        
        res.json({
            success: true,
            chatDetail: {
                id: chat.id,
                username: chat.username,
                email: decrypt(chat.encryptedEmail),
                messages: chat.messages.map(m => {
                    const msg = m.toObject();
                    return {
                        ...msg,
                        text: decrypt(msg.text)
                    };
                }),
                createdAt: chat.createdAt
            }
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ success: false, message: "Server error" });
    }
}

export default chatController;