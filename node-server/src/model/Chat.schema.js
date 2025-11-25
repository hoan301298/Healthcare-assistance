import { Schema, model } from "mongoose";
import { messageDetailSchema } from "./Message.schema.js";

const chatDetailSchema = new Schema({
    username: { type: String, required: true },
    hashedEmail: { type: String, required: true },
    encryptedEmail: { type: String, required: true },
    messages: { type: [messageDetailSchema], default: [] },
}, { 
    timestamps: true,
    indexs: [
        { key: { email: 1 }, unique: true },
        { key: { username: 1 } }
    ]
});

const ChatDetail = model('chat_detail', chatDetailSchema);

export default ChatDetail;