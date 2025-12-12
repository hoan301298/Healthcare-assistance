import { Input } from "../ui/input";
import useAuthForm from "@/hooks/auth/useAuthForm";
import useAuth from "@/hooks/auth/useAuth";
import useHandleSupport from "@/hooks/chatSupport/useHandleSupport";

const Overlay = () => {
    const {
        isAuthenticated
    } = useAuth();
    const {
        loginForm,
        setLoginForm
    } = useAuthForm();
    const {
        handleStartChat
    } = useHandleSupport();

    return !isAuthenticated && (
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
                    type="email"
                    placeholder="Email"
                    className="w-full p-2 border rounded-md"
                    value={loginForm.email}
                    onChange={e => setLoginForm({
                        ...loginForm,
                        email: e.target.value
                    })}
                    required
                />

                <Input
                    type="password"
                    placeholder="Password"
                    className="w-full p-2 border rounded-md"
                    value={loginForm.password}
                    onChange={e => setLoginForm({
                        ...loginForm,
                        password: e.target.value
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