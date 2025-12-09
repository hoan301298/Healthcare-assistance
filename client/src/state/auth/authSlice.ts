import { User } from "@/components/models/auth/User";
import { LoginRequestDto } from "@/components/models/Dto/LoginRequestDto";
import { SignUpRequestDto } from "@/components/models/Dto/SignUpRequestDto";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
    loginData: LoginRequestDto;
    signUpData: SignUpRequestDto;
    user: User | null;
    isSuccess: boolean;
}

const initialState: AuthState = {
    loginData: {
        email: '',
        password: ''
    },
    signUpData: {
        email: '',
        password: '',
        name: '',
        confirmPassword: ''
    },
    user: null,
    isSuccess: false
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setLoginDataState: (state, action: PayloadAction<LoginRequestDto>) => {
            state.loginData = action.payload;
        },
        setSignUpDataState: (state, action: PayloadAction<SignUpRequestDto>) => {
            state.signUpData = action.payload;
        },
        setUserDataState: (state, action: PayloadAction<User>) => {
            state.user = action.payload;
        },
        setIsSuccessState: (state, action: PayloadAction<boolean>) => {
            state.isSuccess = action.payload;
        },
        clearAuthSlice: () => initialState,
    }
})

export const { 
    setLoginDataState,
    setSignUpDataState,
    setUserDataState,
    setIsSuccessState
} = authSlice.actions ;
export default authSlice.reducer;