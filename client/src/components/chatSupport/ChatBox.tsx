import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Send, Bot, User } from 'lucide-react';
import { useLayoutEffect } from 'react';
import useHandleSocket from '@/hooks/chatSupport/useHandleSocket';

const ChatBox = () => {
    const {
        isAuthenticated,
        isConnected,
        inputValue,
        messagesEndRef,
        messages,
        handleSend,
        handleKeyPress,
        handleTyping,
        setInputValue,
    } = useHandleSocket();

    useLayoutEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

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
                                message.sender === 'user'
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
                                    message.sender === 'user'
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
                        value={inputValue}
                        onChange={(e) => {
                            setInputValue(e.target.value);
                            handleTyping();
                        }}
                        onKeyDown={handleKeyPress}
                        placeholder={
                            !isAuthenticated 
                                ? "Please verify to chat..." 
                                : !isConnected 
                                ? "Connecting..." 
                                : "Type your message..."
                        }
                        className="flex-1"
                        disabled={!isAuthenticated || !isConnected}
                    />
                    <Button
                        onClick={handleSend}
                        size="icon"
                        className="bg-primary hover:bg-primary/90"
                        disabled={!isAuthenticated || !isConnected || !inputValue.trim()}
                        title="Send message"
                    >
                        <Send className="h-4 w-4" />
                    </Button>
                </div>
                {!isAuthenticated && (
                    <p className="text-xs text-muted-foreground mt-2">
                        Please verify your email to start chatting
                    </p>
                )}
            </div>
        </Card>
    );
};

export default ChatBox;