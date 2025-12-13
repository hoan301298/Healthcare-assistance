import { Input } from "../ui/input";
import useAuthForm from "@/hooks/auth/useAuthForm";
import useHandleSupport from "@/hooks/chatSupport/useHandleSupport";
import { Button } from "../ui/button";

const Overlay = () => {
    const {
        loginForm,
        setLoginForm
    } = useAuthForm();
    const {
        handleStartChat
    } = useHandleSupport();

    return (
        <div className="absolute inset-0 flex items-center justify-center bg-black/40 z-20">
            <form 
                onSubmit={handleStartChat} 
                className="bg-card p-6 rounded-xl shadow-lg space-y-4 w-[350px]"
            >
                <h2 className="text-xl font-semibold text-center">Start Chat Support</h2>
                <p className="text-sm text-muted-foreground text-center">
                    Login to start
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

                <Button
                    type="submit"
                    className="w-full bg-primary text-white py-2 rounded-md"
                >
                    Login
                </Button>
            </form>
        </div>
    );
};

export default Overlay;