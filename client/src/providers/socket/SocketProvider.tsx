import { useEffect, useRef } from "react";
import { io, Socket } from "socket.io-client";
import { SocketContext } from "./socket.context";
import useChat from "@/hooks/chat/useChat";
import { API_V1_URL, ENV } from "@/constant";

const SocketProvider = ({ children }: { children: React.ReactNode }) => {
    const { chatDetail, setIsConnected } = useChat();
    const socketRef = useRef<Socket | null>(null);
    const joinedChatRef = useRef<string | null>(null);

    const disconnectSocket = () => {
        if (socketRef.current) {
            if (joinedChatRef.current) {
                socketRef.current.emit("leave-chat", {
                    id: joinedChatRef.current,
                });
            }

            socketRef.current.disconnect();
            socketRef.current = null;
            joinedChatRef.current = null;
            setIsConnected(false);
        }
    };

    useEffect(() => {
        if (!chatDetail?.id) return;

        if (!socketRef.current) {
            const socket = io(ENV === "dev" ? API_V1_URL : "", {
                path: "/v1/socket.io",
                transports: ["websocket"],
                reconnection: true,
            });

            socketRef.current = socket;

            socket.on("connect", () => setIsConnected(true));
            socket.on("disconnect", () => setIsConnected(false));
        }

        if (joinedChatRef.current !== chatDetail.id) {
            socketRef.current.emit("join-chat", { 
                chat_id: chatDetail.id,
                user_id: chatDetail.user_id
            });
            joinedChatRef.current = chatDetail.id;
        }
    }, [chatDetail?.id]);

    return (
        <SocketContext.Provider value={{ socket: socketRef.current, disconnectSocket }}>
            {children}
        </SocketContext.Provider>
    );
};

export default SocketProvider;