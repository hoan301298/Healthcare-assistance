import { useNavigate } from "react-router-dom";
import useAuth from "./useAuth"
import useAuthForm from "./useAuthForm";

const useHandleAuth = () => {
    const navigate = useNavigate();
    const {
        login,
        register,
    } = useAuth();

    const {
        loginForm,
        registerForm,
    } = useAuthForm();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        if (loginForm.email.trim() == '' || loginForm.password.trim() == '') return;

        await login(loginForm);
        setTimeout(() => navigate('/'), 1000);
    };

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();

        if (registerForm.password !== registerForm.confirmPassword) return;

        await register(registerForm);
        setTimeout(() => navigate('/'), 1000);
    }

    return {
        handleLogin,
        handleRegister,
    }
}

export default useHandleAuth;