import { LoginRequestDto } from "@/components/models/Dto/LoginRequestDto";
import { RegisterRequestDto } from "@/components/models/Dto/RegisterRequestDto";
import { ResetPasswordRequestDto } from "@/components/models/Dto/ResetPasswordRequestDto";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthFormState {
    loginForm: LoginRequestDto,
    registerForm: RegisterRequestDto,
    resetPasswordForm: ResetPasswordRequestDto,
}

const initialState: AuthFormState = {
    loginForm: {
        email: 'healthcare@gmail.com',
        password: 'example123'
    },
    registerForm: {
        email: '',
        name: '',
        password: '',
        confirmPassword: ''
    },
    resetPasswordForm: {
        oldPassword: '',
        newPassword: '',
    }
}

const authFormSlice = createSlice({
    name: 'authForm',
    initialState,
    reducers: {
        setLoginFormState: (state, action: PayloadAction<LoginRequestDto>) => {
            state.loginForm = action.payload;
        },
        setRegisterFormState: (state, action: PayloadAction<RegisterRequestDto>) => {
            state.registerForm = action.payload;
        },
        setResetPasswordFormState: (state, action: PayloadAction<ResetPasswordRequestDto>) => {
            state.resetPasswordForm = action.payload;
        },
        clearFormState: () => initialState,
    }
});

export const { setLoginFormState, setRegisterFormState, setResetPasswordFormState, clearFormState } = authFormSlice.actions;
export default authFormSlice.reducer;