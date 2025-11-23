import useSupport from "@/hooks/chatSupport/useSupport";
import { Input } from "../ui/input";
import { useState } from "react";
import { getChatInfo } from "@/hooks/requests/chatInfo";

const Overlay = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const { 
        supportState,
        setChatDetail,
        setInfoRequest,
        setVerified
    } = useSupport();

    if (supportState.isVerified) return null;

    const handleStartChat = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            setLoading(true);
            const response = await getChatInfo(supportState.chatRequest);
            if (response) {
                setChatDetail(response);
                setVerified(true);
            }
        } catch (error) {
            console.error("Fail fetch data:", error);
        } finally {
            setLoading(false);
        }
    }

    return !supportState.isVerified && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/40 z-20">
            <form 
                onSubmit={handleStartChat} 
                className="bg-card p-6 rounded-xl shadow-lg space-y-4 w-[350px]"
            >
                <h2 className="text-xl font-semibold">Start Chat Support</h2>
                <p className="text-sm text-muted-foreground">
                    Please enter your details to begin
                </p>

                <Input
                    type="text"
                    placeholder="Your Name"
                    className="w-full p-2 border rounded-md"
                    value={supportState.chatRequest.username}
                    onChange={e => setInfoRequest({
                        ...supportState.chatRequest,
                        username: e.target.value
                    })}
                    required
                />

                <Input
                    type="email"
                    placeholder="Your Email"
                    className="w-full p-2 border rounded-md"
                    value={supportState.chatRequest.email}
                    onChange={e => setInfoRequest({
                        ...supportState.chatRequest,
                        email: e.target.value
                    })}
                    required
                />

                <button
                    type="submit"
                    className="w-full bg-primary text-white py-2 rounded-md"
                >
                    {loading ? "Starting..." : "Start Chat"}
                </button>
            </form>
        </div>
    );
};

export default Overlay;