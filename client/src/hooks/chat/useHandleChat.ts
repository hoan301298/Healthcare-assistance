import { toast } from "@/components/ui/use-toast";
import useAuth from "../auth/useAuth";
import useAuthForm from "../auth/useAuthForm";
import useChat from "./useChat";

const useHandleChat = () => {
    const { fetchChatDetail } = useChat();
    const { login, isAuthenticated } = useAuth();
    const { loginForm, clearForms } = useAuthForm();

    const handleStartChat = async (e: React.FormEvent) => {
        e.preventDefault();
    
        try {
            if (isAuthenticated) return;
    
            const loginResponse = await login(loginForm);
            if (loginResponse.success) {
                clearForms();
                // await fetchChatDetail();
                toast({ title: loginResponse.data.message });
            } else {
                toast({ title: loginResponse.data.message, variant: "destructive" });
            }
        } catch (err) {
            console.error("handleStartChat error:", err);
            toast({ title: "Unexpected error occurred", variant: "destructive" });
        }
    }

    return {
        handleStartChat
    }
}

export default useHandleChat;