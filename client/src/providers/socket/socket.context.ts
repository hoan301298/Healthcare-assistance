import { createContext, useContext } from "react";
import { Socket } from "socket.io-client"

type SocketContextType = {
    socket: Socket | null;
    disconnectSocket: () => void;
};

export const SocketContext = createContext<SocketContextType>({
    socket: null,
    disconnectSocket: () => {}
});

export const useSocket = () => useContext(SocketContext);