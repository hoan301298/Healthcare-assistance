import { LoginRequestDto } from "@/components/models/Dto/LoginRequestDto";
import { RegisterRequestDto } from "@/components/models/Dto/RegisterRequestDto";
import { ResetPasswordRequestDto } from "@/components/models/Dto/ResetPasswordRequestDto";
import { clearFormState, setLoginFormState, setRegisterFormState, setResetPasswordFormState } from "@/state/auth/authFormSlice";
import { AppDispatch, RootState } from "@/state/store"
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux"

const useAuthForm = () => {
    const { loginForm, registerForm, resetPasswordForm } = useSelector((state: RootState) => state.authForm);
    const dispatch = useDispatch<AppDispatch>();

    const setLoginForm = (data: LoginRequestDto) => dispatch(setLoginFormState(data));

    const setRegisterForm = (data: RegisterRequestDto) => dispatch(setRegisterFormState(data));

    const setResetPasswordForm = (data: ResetPasswordRequestDto) => dispatch(setResetPasswordFormState(data));

    const clearForms = () => dispatch(clearFormState());

    return {
        loginForm,
        registerForm,
        resetPasswordForm,
        setLoginForm,
        setRegisterForm,
        setResetPasswordForm,
        clearForms
    }
}

export default useAuthForm;