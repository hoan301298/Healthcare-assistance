import { useRef } from 'react';
import Navbar from '@/components/Navbar';
import { io, Socket } from 'socket.io-client';
import ChatBox from '@/components/chatSupport/ChatBox';
import useSupport from '@/hooks/useSupport';
import Overlay from '@/components/chatSupport/Overlay';

const Chat = () => {
  const socketRef = useRef<Socket | null>(null);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 pt-24 pb-6">
        <div className="max-w-4xl mx-auto">
          <ChatBox />
        </div>
        <Overlay/>
      </div>
    </div>
  );
};

export default Chat;