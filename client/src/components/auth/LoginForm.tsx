import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import useHandleAuth from "@/hooks/auth/useHandleAuth";
import useAuthForm from "@/hooks/auth/useAuthForm";

const LoginForm = () => {
    const {
        loginForm,
        setLoginForm
    } = useAuthForm();

    const { handleLogin } = useHandleAuth();

    return (
        <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
                <Label htmlFor="login-email">Email</Label>
                <Input
                    id="login-email"
                    type="email"
                    placeholder="john@example.com"
                    value={loginForm.email}
                    onChange={(e) =>
                        setLoginForm({ ...loginForm, email: e.target.value })
                    }
                    required
                />
            </div>
            <div className="space-y-2">
                <Label htmlFor="login-password">Password</Label>
                <Input
                    id="login-password"
                    type="password"
                    placeholder="••••••••"
                    value={loginForm.password}
                    onChange={(e) =>
                        setLoginForm({ ...loginForm, password: e.target.value })
                    }
                    required
                />
            </div>
            <Button
                type="submit"
                className="w-full bg-primary hover:bg-primary-dark"
            >
                Login
            </Button>
        </form>
    )
}

export default LoginForm;