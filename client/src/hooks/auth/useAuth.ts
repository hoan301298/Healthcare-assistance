import type { RootState, AppDispatch } from "@/state/store";
import { useSelector, useDispatch } from "react-redux";
import { login, register, checkAuth, logout } from "@/state/auth/authThunks";
import { AuthResponseDto } from "@/components/models/Dto/AuthResponseDto";
import { LoginRequestDto } from "@/components/models/Dto/LoginRequestDto";
import { RegisterRequestDto } from "@/components/models/Dto/RegisterRequestDto";
import { resetAuthState } from "@/state/auth/authSlice";
import { useEffect } from "react";
import useAuthForm from "./useAuthForm";
import { toast } from "@/components/ui/use-toast";

const useAuth = () => {
    const dispatch: AppDispatch = useDispatch();
    const auth = useSelector((state: RootState) => state.auth);
    const {
        clearForms
    } = useAuthForm();

    const loginUser = async (data: LoginRequestDto) => {
        const result = await dispatch(login(data));

        if (login.fulfilled.match(result)) {
            clearForms();
            toast({ title: result.payload.message });
            return { success: true, data: result.payload as AuthResponseDto };
        } else {
            toast({ title: "Login failed!", description: result.payload, variant: "destructive" });
            return { success: false, error: result.payload as string };
        }
    };

    const registerUser = async (data: RegisterRequestDto) => {
        const result = await dispatch(register(data));

        if (register.fulfilled.match(result)) {
            clearForms();
            toast({ title: result.payload.message });
            return { success: true, data: result.payload as AuthResponseDto };
        } else {
            toast({ title: "Register failed!", description: result.payload, variant: "destructive" });
            return { success: false, error: result.payload as string };
        }
    };

    const checkUserAuth = async () => {
        const result = await dispatch(checkAuth());
        if (checkAuth.fulfilled.match(result)) {
            return { success: true, user: result.payload };
        } else {
            return { success: false };
        }
    };

    const logoutUser = async () => {
        await dispatch(logout());
    };

    const clearAuthStatus = () => dispatch(resetAuthState());

    useEffect(() => {

    })

    return {
        user: auth.user,
        isAuthenticated: auth.isAuthenticated,
        loading: auth.loading,
        error: auth.error,
        success: auth.success,
        message: auth.message,

        login: loginUser,
        register: registerUser,
        checkAuth: checkUserAuth,
        logout: logoutUser,
        clearAuthStatus,
    };
};

export default useAuth;