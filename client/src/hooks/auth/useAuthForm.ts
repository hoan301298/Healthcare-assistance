import { LoginRequestDto } from "@/components/models/Dto/LoginRequestDto";
import { RegisterRequestDto } from "@/components/models/Dto/RegisterRequestDto";
import { clearFormState, setLoginFormState, setRegisterFormState } from "@/state/auth/authFormSlice";
import { AppDispatch, RootState } from "@/state/store"
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux"

const useAuthForm = () => {
    const { loginForm, registerForm } = useSelector((state: RootState) => state.authForm);
    const dispatch = useDispatch<AppDispatch>();

    const setLoginForm = (data: LoginRequestDto) => dispatch(setLoginFormState(data));

    const setRegisterForm = (data: RegisterRequestDto) => dispatch(setRegisterFormState(data));

    const clearForms = () => dispatch(clearFormState());

    return {
        loginForm,
        registerForm,
        setLoginForm,
        setRegisterForm,
        clearForms
    }
}

export default useAuthForm;