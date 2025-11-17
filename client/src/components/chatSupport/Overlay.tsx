import useSupport from "@/hooks/useSupport";
import { Input } from "../ui/input";

const Overlay = () => {
    const { 
        supportState,
        setChatDetail,
        setVerified
    } = useSupport();

    if (supportState.isVerified) return null;

    return !supportState.isVerified && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/40 z-20">
            <form 
                onSubmit={(e) => {
                    e.preventDefault();
                    setVerified(true)
                }} 
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
                    value={supportState.chatDetail.username}
                    onChange={e => setChatDetail({
                        ...supportState.chatDetail,
                        username: e.target.value
                    })}
                    required
                />

                <Input
                    type="email"
                    placeholder="Your Email"
                    className="w-full p-2 border rounded-md"
                    value={supportState.chatDetail.email}
                    onChange={e => setChatDetail({
                        ...supportState.chatDetail,
                        email: e.target.value
                    })}
                    required
                />

                <button
                    type="submit"
                    className="w-full bg-primary text-white py-2 rounded-md"
                >
                    Start Chat
                </button>
            </form>
        </div>
    );
};

export default Overlay;
