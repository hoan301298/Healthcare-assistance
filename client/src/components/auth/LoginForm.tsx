import useAuth from "@/hooks/auth/useAuth";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { toast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { loginSubmit } from "@/hooks/requests/authenticate";
import useHandleAuth from "@/hooks/auth/useHandleAuth";

const LoginForm = () => {
    const navigate = useNavigate();
    const {
        authState,
        setLoginData,
        setUserData
    } = useAuth();

    const { loginData } = authState;
    const { handleLogin } = useHandleAuth();

    return (
        <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
                <Label htmlFor="login-email">Email</Label>
                <Input
                    id="login-email"
                    type="email"
                    placeholder="john@example.com"
                    value={loginData.email}
                    onChange={(e) =>
                        setLoginData({ ...loginData, email: e.target.value })
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
                    value={loginData.password}
                    onChange={(e) =>
                        setLoginData({ ...loginData, password: e.target.value })
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