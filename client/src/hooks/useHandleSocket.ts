import { useEffect, useRef, useState } from "react";
import { io, Socket } from "socket.io-client"
import useSupport from "./useSupport";
import { SOCKET_SERVER_URL } from "@/constant";
import { Message } from "@/components/models/chat/Message";
import { botResponses } from "@/components/models/chat/BotResponses";

let socket: Socket | null = null;

const useHandleSocket = () => {
    const [isConnected, setIsConnected] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const {
        supportState,
        setMessages,
        setInputValue
    } = useSupport();
    const { isVerified, chatDetail, inputValue } = supportState;

    const messages = supportState?.chatDetail?.messages ?? [{
        id: (Date.now() + Math.random()).toString(),
        sender: 'bot',
        text: 'Hi, I\'m here to support you. What do you need?',
        timestamp: new Date()
    }];

    useEffect(() => {
        if (!isVerified) return;

        if (!socket) {
            socket = io(SOCKET_SERVER_URL, {
                path: '/v1/socket.io',
                transports: ['websocket', 'polling'],
                autoConnect: true,
                reconnection: true,
            });

            socket.on('connect', () => {
                setIsConnected(true);

                socket?.emit('join-chat', { id: chatDetail.id });
            });

            socket.on('disconnect', (reason) => {
                setIsConnected(false);
            });

            socket.on('connect_error', (error) => {
                console.error('Connection error:', error.message);
                setIsConnected(false);
            });

            socket.on('message-response', (message: Message) => {
                setMessages(prev => [...prev, {
                    id: message.id,
                    text: message.text,
                    sender: message.sender,
                    timestamp: new Date(message.timestamp)
                }]);
            });

            socket.on('typing-response', (data) => {

            });

            socket.on('error', (error) => {
                console.error('Socket error:', error.message);
            });
        }
    }, [isVerified])

    const sendUserMessage = (text: string) => {
        if (!socket || !isConnected) {
            console.error('Socket not connected');
            return;
        }
        setInputValue('');

        const userMessage: Message = {
            id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
            text: text,
            sender: 'user',
            timestamp: new Date(),
        };

        socket.emit('send-message', {
            id: userMessage.id,
            sender: userMessage.sender,
            text: text,
            timestamp: userMessage.timestamp
        });

        setTimeout(() => sendBotMessage(), 1000);
    };

    const sendBotMessage = () => {
        if (!socket || !isConnected) {
            console.error('Socket not connected');
            return;
        }

        const botMessage: Message = {
            id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
            text: botResponses[Math.floor(Math.random() * botResponses.length)],
            sender: 'bot',
            timestamp: new Date(),
        };

        socket.emit('send-message', {
            id: botMessage.id,
            sender: botMessage.sender,
            text: botMessage.text,
            timestamp: botMessage.timestamp
        });
    };

    const handleSend = () => {
        if (!isVerified || !isConnected) {
            console.warn('Cannot send message: not verified or not connected');
            return;
        }
        if (!inputValue.trim()) return;
        
        sendUserMessage(inputValue);
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    const handleTyping = () => {
        if (!socket || !isConnected) return;
        
        socket.emit('typing', {
            sender: 'user',
            isTyping: true
        });
    };

    return {
        isVerified,
        isConnected,
        inputValue,
        messagesEndRef,
        messages,
        handleSend,
        handleKeyPress,
        handleTyping,
        setInputValue,
    }
}

export default useHandleSocket;