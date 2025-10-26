import { Schema, model } from 'mongoose';
import { constants } from '../../constant.js';
import crypto from 'crypto-js';

const messageSchema = new Schema({
    room_id: {type: Number, required: true},
    username: {type: String, required: true},
    title: {type: String, required: true},
    sender: {type: String, required: true},
    content: {type: String, required: true},
    sentAt: {type: Date, default: Date.now}
});

messageSchema.pre('save', function(next) {
    const message = this;
    const encryptedContent = crypto.AES.encrypt(message.content, constants.ENCRYPT_KEY).toString();
    message.content = encryptedContent;
    next();
});

const MessageDetail = model('message_details', messageSchema);

export default MessageDetail;

