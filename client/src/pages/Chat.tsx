import Navbar from '@/components/Navbar';
import ChatBox from '@/components/chatSupport/ChatBox';
import Overlay from '@/components/chatSupport/Overlay';

const Chat = () => {

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