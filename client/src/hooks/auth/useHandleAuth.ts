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

            toast({
                title: 'Login Successful',
                description: 'Welcome back to HealthCare+',
            });
            setLoginData({
                email: '',
                password: ''
            });
            setIsSuccess(true);
            setTimeout(() => navigate('/'), 1500);
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

            toast({
                title: 'Account Created',
                description: 'Your account has been successfully created!',
            });

            setSignUpData({
                email: '',
                name: '',
                password: '',
                confirmPassword: ''
            })
            setIsSuccess(true);
            setTimeout(() => navigate('/'), 1500);    
        } catch (error) {
            toast({
                title: 'Sign up failed',
                description: 'Your email already existed!',
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