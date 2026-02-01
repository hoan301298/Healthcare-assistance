import { encrypt } from '../helper/cryptoFunctions.js';
import { buildMistralMessages, getMistralReply } from './service/mistral.service.js';
import Chat from './model/Chat.schema.js';

const ALLOWED_SENDERS = "user";

const socketGateway = (io) => {

    io.on('connection', (socket) => {
        console.log(`⚡: User connected - ${socket.id}`);

        socket.on('join-chat', async ({ chat_id, user_id }) => {
            try {
                if (!chat_id) {
                    return socket.emit('error', { message: 'ChatID is required' });
                }

                const chat = await Chat.findById(chat_id);
                if (!chat) {
                    return socket.emit("error", { message: "Chat not found" });
                }

                socket.data.chatId = chat_id;
                socket.data.userId = user_id;
                socket.data.messages = chat.messages;

                socket.join(chat_id);

                console.log(
                    `👤 User ${user_id} joined chat ${chat_id} (socket ${socket.id})`
                );
            } catch (error) {
                console.error("join-chat error:", error);
                socket.emit("error", { message: "Failed to join chat" });
            }
        });

        socket.on('send-message', async ({ id, sender, text, timestamp }) => {
            try {
                
                const chatId = socket.data.chatId;

                if (!chatId) {
                    return socket.emit("error", { message: "Join a chat first" });
                }

                const trimmed = text?.trim();
                if (!trimmed) return;

                if (sender !== ALLOWED_SENDERS) {
                    return socket.emit("error", {
                        message: "Invalid sender",
                    });
                }

                if (trimmed.length > 5000) {
                    return socket.emit("error", { message: "Message too long" });
                };

                const encryptedText = encrypt(trimmed);

                const message = {
                    id: id ?? Date.now().toString(),
                    sender,
                    text: encryptedText,
                    timestamp: timestamp ?? new Date(),
                };

                await Chat.findByIdAndUpdate(chatId, {
                    $push: { messages: message },
                });

                socket.data.messages.push(message);

                io.to(chatId).emit("message-response", {
                    id: message.id,
                    sender,
                    text: trimmed,
                    timestamp: message.timestamp,
                });

                io.to(chatId).emit("typing-response", {
                    sender: "bot",
                    isTyping: true,
                });

                const mistralMessages = [
                    { role: "system", content: "You are a helpful healthcare assistant." },
                    ...buildMistralMessages(socket.data.messages.slice(-10)),
                ];

                const botReply = await getMistralReply(mistralMessages);

                const botMessage = {
                    id: Date.now().toString(),
                    sender: "bot",
                    text: encrypt(botReply),
                    timestamp: new Date(),
                };

                await Chat.findByIdAndUpdate(chatId, {
                    $push: { messages: botMessage },
                });

                io.to(chatId).emit("message-response", {
                    id: botMessage.id,
                    sender: "bot",
                    text: botReply,
                    timestamp: botMessage.timestamp,
                });

                io.to(chatId).emit("typing-response", {
                    sender: "bot",
                    isTyping: false,
                });

                console.log(`Message sent in chat ${chatId} by ${sender}`);
            } catch (error) {
                console.error('send-message error:', error);
                socket.emit('error', { message: 'Failed to send message' });
            }
        });

        socket.on('disconnect', () => {
            console.log(`❌: User disconnected - ${socket.id}`);
        });
    });
};

export default socketGateway;