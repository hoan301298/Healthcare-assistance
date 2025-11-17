import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Send, Bot, User } from 'lucide-react';
import { useLayoutEffect, useRef } from 'react';
import useMessages from '@/hooks/useMessages';

const ChatBox = () => {
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const {
        messageState,
        setMessages,
        setInputValue,
        clearMessages
    } = useMessages()

    useLayoutEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messageState.messages]);

    console.log(messageState.messages)

    const sendUserMessage = (text: string) => {
        setInputValue('');
        setMessages(prev => [...prev, {
            id: Date.now() + Math.random().toString(),
            text: text,
            sender: 'user',
            timestamp: new Date()
        }]);
        setTimeout(() => sendBotMessage(), 1000);
    };

    const sendBotMessage = () => {
        const botResponses = [
            'I understand your concern. Let me help you find the right facility.',
            'That\'s a great question! I recommend checking out our verified places.',
            'I can help you book an appointment. Would you like to search for places near you?',
            'For urgent matters, I recommend visiting our urgent care places.',
            'I\'m here to assist you with any healthcare-related questions.',
        ];

        setMessages(prev => [
            ...prev,
            {
                id: Date.now() + Math.random().toString(),
                text: botResponses[Math.floor(Math.random() * botResponses.length)],
                sender: 'bot',
                timestamp: new Date()
            }
        ]);
    };
    const handleSend = () => {
        if (!messageState.inputValue.trim()) return;
        sendUserMessage(messageState.inputValue);
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            handleSend();
        }
    };

    return (
        <Card className="h-[calc(100vh-200px)] flex flex-col border-border">
            <CardHeader className="border-b border-border">
                <CardTitle className="flex items-center gap-2">
                    <div className="p-2 bg-primary/10 rounded-lg">
                        <Bot className="h-5 w-5 text-primary" />
                    </div>
                    Healthcare Chat Support
                </CardTitle>
                <CardDescription>
                    Get instant assistance from our healthcare support team
                </CardDescription>
            </CardHeader>
            <CardContent className="flex-1 overflow-y-auto p-6 space-y-4">
                {messageState.messages.map((message) => (
                    <div
                        key={message.id}
                        className={`flex items-start gap-3 ${message.sender === 'user' ? 'flex-row-reverse' : ''
                            }`}
                    >
                        <Avatar className={message.sender === 'bot' ? 'bg-primary/10' : 'bg-accent/10'}>
                            <AvatarFallback>
                                {message.sender === 'bot' ? (
                                    <Bot className="h-5 w-5 text-primary" />
                                ) : (
                                    <User className="h-5 w-5 text-accent" />
                                )}
                            </AvatarFallback>
                        </Avatar>
                        <div
                            className={`flex flex-col max-w-[70%] ${message.sender === 'user' ? 'items-end' : 'items-start'
                                }`}
                        >
                            <div
                                className={`px-4 py-2 rounded-lg ${message.sender === 'bot'
                                    ? 'bg-muted text-foreground'
                                    : 'bg-primary text-primary-foreground'
                                    }`}
                            >
                                <p className="text-sm">{message.text}</p>
                            </div>
                            <span className="text-xs text-muted-foreground mt-1">
                                {message.timestamp.toLocaleTimeString([], {
                                    hour: '2-digit',
                                    minute: '2-digit',
                                })}
                            </span>
                        </div>
                    </div>
                ))}
                <div ref={messagesEndRef} />
            </CardContent>
            <div className="border-t border-border p-4">
                <div className="flex gap-2">
                    <Input
                        value={messageState.inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        onKeyPress={handleKeyPress}
                        placeholder="Type your message..."
                        className="flex-1"
                    />
                    <Button
                        onClick={handleSend}
                        size="icon"
                        className="bg-primary hover:bg-primary-dark flex-shrink-0"
                    >
                        <Send className="h-4 w-4" />
                    </Button>
                </div>
            </div>
        </Card>
    )
}

export default ChatBox;