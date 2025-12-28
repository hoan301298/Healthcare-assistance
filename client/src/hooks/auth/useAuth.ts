import type { RootState, AppDispatch } from "@/state/store";
import { useSelector, useDispatch } from "react-redux";
import { login, register, checkAuth, logout } from "@/state/thunks/authThunks";
import { AuthResponseDto } from "@/components/models/Dto/AuthResponseDto";
import { LoginRequestDto } from "@/components/models/Dto/LoginRequestDto";
import { RegisterRequestDto } from "@/components/models/Dto/RegisterRequestDto";
import { resetAuthState } from "@/state/auth/authSlice";
import useAuthForm from "./useAuthForm";
import { toast } from "@/components/ui/use-toast";
import { useSocket } from "@/providers/socket/socket.context";
import useChat from "../chat/useChat";
import { clearChatState } from "@/state/chatSlice";
import useAppointment from "../appointment/useAppointment";

const useAuth = () => {
    const dispatch: AppDispatch = useDispatch();
    const auth = useSelector((state: RootState) => state.auth);
    const { fetchChatDetail } = useChat();
    const { getAllAppointments } = useAppointment();
    const { clearForms } = useAuthForm();
    const { disconnectSocket } = useSocket();

    const loginUser = async (data: LoginRequestDto) => {
        const result = await dispatch(login(data));

        if (login.fulfilled.match(result)) {
            clearForms();
            await fetchChatDetail();
            await getAllAppointments();
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
            await fetchChatDetail();
            toast({ title: `Welcome back, ${result.payload.user.name?? ''}!` });
            return { success: true, data: result.payload as AuthResponseDto };
        } else {
            return { success: false, error: result.payload as string };
        }
    };

    const logoutUser = async () => {
        try {
            const result = await dispatch(logout());
    
            if (!logout.fulfilled.match(result)) {
                return {
                    success: false,
                    error: result.payload as string,
                };
            }
    
            disconnectSocket();
            dispatch(clearChatState());
            dispatch(resetAuthState());
    
            toast({ title: "Logout successful" });
    
            return {
                success: true,
                data: result.payload as AuthResponseDto,
            };
        } catch (error) {
            console.error("Logout error:", error);
            return {
                success: false,
                error: "Unexpected logout error",
            };
        }
    };

    const clearAuthStatus = () => dispatch(resetAuthState());

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