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

        const res = await login(loginForm);
        if(res.success) navigate('/');
    };

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();

        if (registerForm.password !== registerForm.confirmPassword) return;

        const res = await register(registerForm);
        if(res.success) navigate('/');
    }

    return {
        handleLogin,
        handleRegister,
    }
}

export default useHandleAuth;