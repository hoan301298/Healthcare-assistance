import useAuth from "@/hooks/auth/useAuth";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import useHandleAuth from "@/hooks/auth/useHandleAuth";
import useAuthForm from "@/hooks/auth/useAuthForm";

const SignUpForm = () => {
    const {
        registerForm,
        setRegisterForm
    } = useAuthForm();
    const { handleRegister } = useHandleAuth();

    return (
        <form onSubmit={handleRegister} className="space-y-4">
            <div className="space-y-2">
                <Label htmlFor="signup-name">Full Name</Label>
                <Input
                    id="signup-name"
                    type="text"
                    placeholder="John Doe"
                    value={registerForm.name}
                    onChange={(e) =>
                        setRegisterForm({ ...registerForm, name: e.target.value })
                    }
                    required
                />
            </div>
            <div className="space-y-2">
                <Label htmlFor="signup-email">Email</Label>
                <Input
                    id="signup-email"
                    type="email"
                    placeholder="john@example.com"
                    value={registerForm.email}
                    onChange={(e) =>
                        setRegisterForm({ ...registerForm, email: e.target.value })
                    }
                    required
                />
            </div>
            <div className="space-y-2">
                <Label htmlFor="signup-password">Password</Label>
                <Input
                    id="signup-password"
                    type="password"
                    placeholder="••••••••"
                    value={registerForm.password}
                    onChange={(e) =>
                        setRegisterForm({ ...registerForm, password: e.target.value })
                    }
                    required
                />
            </div>
            <div className="space-y-2">
                <Label htmlFor="signup-confirm">Confirm Password</Label>
                <Input
                    id="signup-confirm"
                    type="password"
                    placeholder="••••••••"
                    value={registerForm.confirmPassword}
                    onChange={(e) =>
                        setRegisterForm({
                            ...registerForm,
                            confirmPassword: e.target.value,
                        })
                    }
                    required
                />
            </div>
            <Button
                type="submit"
                className="w-full bg-primary hover:bg-primary-dark"
            >
                Create Account
            </Button>
        </form>
    )
}

export default SignUpForm;