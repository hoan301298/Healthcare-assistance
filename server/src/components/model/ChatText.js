const { Schema, model } = require('mongoose');
const CryptoJS = require('crypto-js');
const encryptKey = process.env.ENCRYPT_KEY;

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
    const encryptedContent = CryptoJS.AES.encrypt(message.content, encryptKey).toString();
    message.content = encryptedContent;
    next();
});

const MessageDetail = model('message_details', messageSchema);

module.exports = MessageDetail;

