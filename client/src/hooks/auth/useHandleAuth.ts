import { useNavigate } from "react-router-dom";
import { loginSubmit } from "../requests/authenticate";
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
            const response = await loginSubmit();

            toast({
                title: 'Login Successful',
                description: 'Welcome back to HealthCare+',
            });
            setLoginData({
                email: '',
                password: ''
            });
            setTimeout(() => navigate('/'), 1500);
        } catch (error) {

        }
    };

    const handleSignUp = (e: React.FormEvent) => {
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
            setTimeout(() => navigate('/'), 1500);    
        } catch (error) {
            
        }

        
    };

    return {
        handleLogin,
        handleSignUp,
    }
}

export default useHandleAuth;