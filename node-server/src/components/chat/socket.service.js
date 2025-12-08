import { encrypt } from '../helper/cryptoFunctions.js';
import Chat from '../../model/Chat.schema.js';

const socketService = (io) => {

    io.on('connection', (socket) => {
        console.log(`⚡: User connected - ${socket.id}`);

        socket.on('join-chat', async (data) => {
            try {
                if (!data?.id) {
                    return socket.emit('error', { message: 'Chat ID is required' });
                }

                const chat = await Chat.findById(data.id);

                if (!chat) {
                    console.log(`Chat not found: ${data.id}`);
                    socket.emit('error', { message: 'Chat not found' });
                    return socket.disconnect(true);
                }

                socket.data.chatId = chat.id;
                socket.join(chat.id);

                console.log(`User ${socket.id} joined chat ${chat.id}`);
                
                socket.emit('joined-chat', {
                    chatId: chat.id,
                    username: chat.username
                });

            } catch (error) {
                console.error('Error in join-chat:', error);
                socket.emit('error', { message: 'Failed to join chat' });
            }
        });

        socket.on('send-message', async (data) => {
            try {
                if (!socket.data.chatId) {
                    return socket.emit('error', { message: 'Join a chat first' });
                }

                if (!data?.text || typeof data.text !== 'string') {
                    return socket.emit('error', { message: 'Invalid message text' });
                }

                if (!data?.sender || typeof data.sender !== 'string') {
                    return socket.emit('error', { message: 'Invalid sender' });
                }

                const text = data.text.trim();
                if (text.length === 0) {
                    return socket.emit('error', { message: 'Message cannot be empty' });
                }
                if (text.length > 5000) {
                    return socket.emit('error', { message: 'Message too long (max 5000 chars)' });
                }

                const chat = await Chat.findById(socket.data.chatId);
                if (!chat) {
                    return socket.emit('error', { message: 'Chat not found' });
                }

                const encryptedText = encrypt(text);

                const newMessage = {
                    id: data.id || Date.now().toString(), // Generate ID if not provided
                    sender: data.sender,
                    text: encryptedText,
                    timestamp: data.timestamp || new Date()
                };

                chat.messages.push(newMessage);
                await chat.save();

                io.to(socket.data.chatId).emit('message-response', {
                    id: newMessage.id,
                    sender: newMessage.sender,
                    text: text, // Send unencrypted to clients
                    timestamp: newMessage.timestamp
                });

                console.log(`Message sent in chat ${socket.data.chatId} by ${data.sender}`);

            } catch (error) {
                console.error('Error in send-message:', error);
                socket.emit('error', { message: 'Failed to send message' });
            }
        });

        socket.on('typing', (data) => {
            try {
                if (!socket.data.chatId) {
                    return;
                }

                if (!data?.sender) {
                    return;
                }

                socket.to(socket.data.chatId).emit('typing-response', {
                    sender: data.sender,
                    isTyping: data.isTyping || true
                });

            } catch (error) {
                console.error('Error in typing:', error);
            }
        });

        socket.on('disconnect', () => {
            console.log(`❌: User disconnected - ${socket.id}`);
        });
    });
};

export default socketService;