import { User } from "@/components/models/auth/User";
import { LoginRequestDto } from "@/components/models/Dto/LoginRequestDto";
import { SignUpRequestDto } from "@/components/models/Dto/SignUpRequestDto";
import { setIsSuccessState, setLoginDataState, setSignUpDataState, setUserDataState } from "@/state/auth/authSlice";
import { RootState } from "@/state/store"
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux"

const useAuth = () => {
    const authState = useSelector((state: RootState) => state.auth);
    const dispatch = useDispatch();

    const setLoginData = (loginData: LoginRequestDto) => {
        dispatch(setLoginDataState(loginData));
    }

    const setSignUpData = (signUpData: SignUpRequestDto) => {
        dispatch(setSignUpDataState(signUpData));
    }

    const setUserData = (userData: User) => {
        dispatch(setUserDataState(userData));
    }

    const setIsSuccess = (value: boolean) => {
        dispatch(setIsSuccessState(value));
    }

    return {
        authState,
        setLoginData,
        setSignUpData,
        setUserData,
        setIsSuccess
    }
}

export default useAuth;