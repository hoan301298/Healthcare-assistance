import { useEffect, useRef } from "react";
import { Message } from "@/components/models/chat/Message";
import { botResponses } from "@/components/models/chat/BotResponses";
import useChat from "./useChat";
import useAuth from "../auth/useAuth";
import { useSocket } from "@/providers/socket/socket.context";

const useHandleSocket = () => {
    const { socket } = useSocket();
    const { isAuthenticated } = useAuth();
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const {
        chatDetail,
        isConnected,
        inputValue,
        setMessages,
        setInputValue,
    } = useChat();

    const messages = chatDetail?.messages ?? [
        {
            id: (Date.now() + Math.random()).toString(),
            sender: "bot",
            text: "Hi, I’m here to support you. What do you need?",
            timestamp: new Date(),
        },
    ];

    useEffect(() => {
        if (!socket || !chatDetail?.id) return;

        const onMessage = (message: Message) => {
            setMessages((prev) => [...prev, message]);
        };

        socket.on("message-response", onMessage);

        return () => {
            socket.off("message-response", onMessage);
        };

    }, [socket, chatDetail?.id])

    const sendUserMessage = (text: string) => {
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