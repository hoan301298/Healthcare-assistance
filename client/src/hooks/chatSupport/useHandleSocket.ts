import { useEffect, useRef, useState } from "react";
import { io, Socket } from "socket.io-client"
import { API_V1_URL } from "@/constant";
import { Message } from "@/components/models/chat/Message";
import { botResponses } from "@/components/models/chat/BotResponses";
import useSupport from "./useSupport";
import useAuth from "../auth/useAuth";

const useHandleSocket = () => {
    const socketRef = useRef<Socket | null>(null);
    const [isConnected, setIsConnected] = useState(socketRef.current?.connected ?? false);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const {
        chatDetail,
        inputValue,
        setMessages,
        setInputValue
    } = useSupport();
    const {
        isAuthenticated,
    } = useAuth();

    const messages = chatDetail?.messages ?? [
        {
            id: (Date.now() + Math.random()).toString(),
            sender: "bot",
            text: "Hi, I’m here to support you. What do you need?",
            timestamp: new Date(),
        },
    ];

    useEffect(() => {
        if (!isAuthenticated || !chatDetail?.id) return;

        if (!socketRef.current) {
            const socket = io(API_V1_URL, {
                path: '/v1/socket.io',
                transports: ['websocket', 'polling'],
                autoConnect: true,
                reconnection: true,
            });

            socketRef.current = socket;

            socket.on('connect', () => {
                setIsConnected(true);
                socket?.emit('join-chat', { id: chatDetail.id });
            });

            socket.on('disconnect', () => setIsConnected(false));

            socket.on('connect_error', (error) => {
                console.error('Connection error:', error.message);
                setIsConnected(false);
            });

            socket.on("message-response", (message: Message) => {
                setMessages((prev) => [...prev, message]);
            });

            socket.on('error', (error) => console.error('Socket error:', error.message));
        }
        
    }, [isAuthenticated, chatDetail?.id])

    const sendUserMessage = (text: string) => {
        const socket = socketRef.current
        if (!socket || !isConnected) return;

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
        const socket = socketRef.current;
        if (!socket || !isConnected) return;

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
        if (!isAuthenticated || !isConnected || !inputValue.trim()) return;
        sendUserMessage(inputValue);
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    const handleTyping = () => {
        const socket = socketRef.current;
        if (!socket || !isConnected) return;
        
        socket.emit('typing', {
            sender: 'user',
            isTyping: true
        });
    };

    return {
        isAuthenticated,
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