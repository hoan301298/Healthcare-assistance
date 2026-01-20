import { useNavigate } from "react-router-dom";
import useAuth from "./useAuth"
import useAuthForm from "./useAuthForm";
import { toast } from "../use-toast";

const useHandleAuth = () => {
    const navigate = useNavigate();
    const {
        login,
        register,
        resetPassword
    } = useAuth();

    const {
        loginForm,
        registerForm,
        resetPasswordForm,
        clearForms,
    } = useAuthForm();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        if (loginForm.email.trim() == '' || loginForm.password.trim() == '') return;

        const res = await login(loginForm);
        if (res.success) navigate('/');
    };

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();

        if (registerForm.password !== registerForm.confirmPassword) return;

        const res = await register(registerForm);
        if (res.success) navigate('/');
    }

    const handleResetPassword = async (e: React.FormEvent): Promise<null> => {
        e.preventDefault();
        if (resetPasswordForm.oldPassword.trim() === '' || resetPasswordForm.newPassword.trim() === '') {
            toast({
                title: "Fields cannot be empty",
                variant: "destructive"
            })
            return;
        }

        const response = await resetPassword(resetPasswordForm);
        console.log(response);
        if (!response.success) {
            toast({
                title: "Reset password has been fail!",
                variant: "destructive"
            })
            return;
        }
        clearForms();
        toast({
            title: "Your password has been reset!",
            variant: "default"
        });
        return null;
    }
    return {
        handleLogin,
        handleRegister,
        handleResetPassword
    }
}

export default useHandleAuth;