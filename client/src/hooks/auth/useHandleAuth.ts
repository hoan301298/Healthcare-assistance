import { useNavigate } from "react-router-dom";
import { loginSubmit, signUpSubmit } from "../requests/authenticate";
import { useToast } from "../use-toast";
import useAuth from "./useAuth"

const useHandleAuth = () => {
    const { toast } = useToast();
    const navigate = useNavigate();
    const {
        authState,
        setLoginData,
        setSignUpData,
        setIsSuccess,
        setUserData
    } = useAuth();
    const { loginData, signUpData, isSuccess } = authState;

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const response = await loginSubmit(loginData);
            console.log(response);
            if (response.success) {
                toast({
                    title: response.message,
                    description: 'Welcome back to HealthCare+',
                });
                setLoginData({
                    email: '',
                    password: ''
                });
                setUserData(response.user);
                setTimeout(() => navigate('/'), 1500);
            } else {
                toast({
                    title: response.message,
                    description: 'Please try again!',
                    variant: 'destructive'
                })
            }
        } catch (error) {
            toast({
                title: 'Login failed',
                description: 'Your credentail is wrong.',
                variant: 'destructive'
            })
        }
    };

    const handleSignUp = async (e: React.FormEvent) => {
        e.preventDefault();

        if (signUpData.password !== signUpData.confirmPassword) {
            toast({
                title: 'Error',
                description: 'Passwords do not match',
                variant: 'destructive',
            });
            return;
        }

        try {
            const response = await signUpSubmit(signUpData);

            if (response.success) {
                toast({
                    title: response.message,
                    description: 'Your account has been successfully created!',
                });

                setSignUpData({
                    email: '',
                    name: '',
                    password: '',
                    confirmPassword: ''
                })
                setUserData(response.user);
                setTimeout(() => navigate('/'), 1500);
            } else {
                toast({
                    title: response.message,
                    description: 'Please try again!',
                    variant: 'destructive'
                })
            }
        } catch (error) {
            toast({
                title: 'Sign up failed',
                description: 'Please try again!',
                variant: 'destructive'
            })
        }
    };

    return {
        handleLogin,
        handleSignUp,
    }
}

export default useHandleAuth;