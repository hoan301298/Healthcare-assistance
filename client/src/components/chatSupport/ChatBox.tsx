import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Send, Bot, User } from 'lucide-react';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { botResponses } from '../models/chat/BotResponses';
import useSupport from '@/hooks/useSupport';
import { io, Socket } from 'socket.io-client';
import { SOCKET_SERVER_URL } from '@/constant';
import { Message } from '../models/chat/Message';

let socket: Socket | null = null;

const ChatBox = () => {
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const [isConnected, setIsConnected] = useState(false);
    const {
        supportState,
        setMessages,
        setInputValue,
    } = useSupport();

    const messages = supportState?.chatDetail?.messages ?? [{
        id: (Date.now() + Math.random()).toString(),
        sender: 'bot',
        text: 'Hi, I\'m here to support you. What do you need?',
        timestamp: new Date()
    }];

    useLayoutEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    useEffect(() => {
        if (!supportState.isVerified) return;

        if (!socket) {
            socket = io(SOCKET_SERVER_URL, {
                path: '/v1/socket.io',
                transports: ['websocket', 'polling'],
                autoConnect: true,
                reconnection: true,
            });

            socket.on('connect', () => {
                setIsConnected(true);
                
                socket?.emit('join-chat', { id: supportState.chatDetail.id });
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

        return () => {
            if (socket) {
                console.log('Cleaning up socket connection');
                socket.off('connect');
                socket.off('disconnect');
                socket.off('connect_error');
                socket.off('joined-chat');
                socket.off('message-response');
                socket.off('typing-response');
                socket.off('error');
                socket.disconnect();
                socket = null;
                setIsConnected(false);
            }
        };
    }, [supportState.isVerified]);

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
        if (!supportState.isVerified || !isConnected) {
            console.warn('Cannot send message: not verified or not connected');
            return;
        }
        if (!supportState.inputValue.trim()) return;
        
        sendUserMessage(supportState.inputValue);
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

    return (
        <Card className="h-[calc(100vh-200px)] flex flex-col border-border">
            <CardHeader className="border-b border-border">
                <CardTitle className="flex items-center gap-2">
                    <div className="p-2 bg-primary/10 rounded-lg">
                        <Bot className="h-5 w-5 text-primary" />
                    </div>
                    Healthcare Chat Support
                    <span className={`ml-auto text-xs px-2 py-1 rounded-full ${
                        isConnected 
                            ? 'bg-green-500/10 text-green-500' 
                            : 'bg-red-500/10 text-red-500'
                    }`}>
                        {isConnected ? '● Online' : '● Offline'}
                    </span>
                </CardTitle>
                <CardDescription>
                    Get instant assistance from our healthcare support team
                </CardDescription>
            </CardHeader>
            <CardContent className="flex-1 overflow-y-auto p-6 space-y-4">
                {messages && messages.length > 0 ? (
                    messages.map((message) => (
                        <div
                            key={message.id}
                            className={`flex items-start gap-3 ${
                                message.sender === 'user' || message.sender === supportState.chatDetail?.username
                                    ? 'flex-row-reverse' 
                                    : ''
                            }`}
                        >
                            <Avatar className={
                                message.sender === 'bot' 
                                    ? 'bg-primary/10' 
                                    : 'bg-accent/10'
                            }>
                                <AvatarFallback>
                                    {message.sender === 'bot' ? (
                                        <Bot className="h-5 w-5 text-primary" />
                                    ) : (
                                        <User className="h-5 w-5 text-accent" />
                                    )}
                                </AvatarFallback>
                            </Avatar>
                            <div
                                className={`flex flex-col max-w-[70%] ${
                                    message.sender === 'user' || message.sender === supportState.chatDetail?.username
                                        ? 'items-end' 
                                        : 'items-start'
                                }`}
                            >
                                <div
                                    className={`px-4 py-2 rounded-lg ${
                                        message.sender === 'bot'
                                            ? 'bg-muted text-foreground'
                                            : 'bg-primary text-primary-foreground'
                                    }`}
                                >
                                    <p className="text-sm whitespace-pre-wrap break-words">
                                        {message.text}
                                    </p>
                                </div>
                                <span className="text-xs text-muted-foreground mt-1">
                                    {new Date(message.timestamp).toLocaleTimeString([], {
                                        hour: '2-digit',
                                        minute: '2-digit',
                                    })}
                                </span>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="flex items-center justify-center h-full text-muted-foreground">
                        <p>No messages yet. Start a conversation!</p>
                    </div>
                )}
                <div ref={messagesEndRef} />
            </CardContent>
            <div className="border-t border-border p-4">
                <div className="flex gap-2">
                    <Input
                        value={supportState.inputValue}
                        onChange={(e) => {
                            setInputValue(e.target.value);
                            handleTyping();
                        }}
                        onKeyDown={handleKeyPress}
                        placeholder={
                            !supportState.isVerified 
                                ? "Please verify to chat..." 
                                : !isConnected 
                                ? "Connecting..." 
                                : "Type your message..."
                        }
                        className="flex-1"
                        disabled={!supportState.isVerified || !isConnected}
                    />
                    <Button
                        onClick={handleSend}
                        size="icon"
                        className="bg-primary hover:bg-primary/90"
                        disabled={!supportState.isVerified || !isConnected || !supportState.inputValue.trim()}
                        title="Send message"
                    >
                        <Send className="h-4 w-4" />
                    </Button>
                </div>
                {!supportState.isVerified && (
                    <p className="text-xs text-muted-foreground mt-2">
                        Please verify your email to start chatting
                    </p>
                )}
            </div>
        </Card>
    );
};

export default ChatBox;