import { Schema, model } from "mongoose";
import { messageDetailSchema } from "./Message.schema.js";

const chatDetailSchema = new Schema({
    user_id: { 
        type: Schema.Types.ObjectId, 
        ref: "User", 
        required: true 
    },
    messages: { type: [messageDetailSchema], default: [] },
}, { 
    timestamps: true,
    indexs: [
        { key: { user_id: 1 } }
    ]
});

const ChatDetail = model('chat', chatDetailSchema);

export default ChatDetail;