import useAuth from "@/hooks/auth/useAuth";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import useHandleAuth from "@/hooks/auth/useHandleAuth";

const SignUpForm = () => {
    const {
        authState,
        setSignUpData
    } = useAuth();
    const { signUpData } = authState;
    const { handleSignUp } = useHandleAuth();

    return (
        <form onSubmit={handleSignUp} className="space-y-4">
            <div className="space-y-2">
                <Label htmlFor="signup-name">Full Name</Label>
                <Input
                    id="signup-name"
                    type="text"
                    placeholder="John Doe"
                    value={signUpData.name}
                    onChange={(e) =>
                        setSignUpData({ ...signUpData, name: e.target.value })
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
                    value={signUpData.email}
                    onChange={(e) =>
                        setSignUpData({ ...signUpData, email: e.target.value })
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
                    value={signUpData.password}
                    onChange={(e) =>
                        setSignUpData({ ...signUpData, password: e.target.value })
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
                    value={signUpData.confirmPassword}
                    onChange={(e) =>
                        setSignUpData({
                            ...signUpData,
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