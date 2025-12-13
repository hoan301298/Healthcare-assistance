import Navbar from '@/components/navbar/Navbar';
import ChatBox from '@/components/chatSupport/ChatBox';
import Overlay from '@/components/chatSupport/Overlay';
import useAuth from '@/hooks/auth/useAuth';

const Chat = () => {
  const {
    isAuthenticated
  } = useAuth();

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 pt-24 pb-6">
        <div className="max-w-4xl mx-auto">
          <ChatBox />
        </div>
        {!isAuthenticated && <Overlay/>}
      </div>
    </div>
  );
};

export default Chat;