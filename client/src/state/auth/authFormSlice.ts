import { LoginRequestDto } from "@/components/models/Dto/LoginRequestDto";
import { RegisterRequestDto } from "@/components/models/Dto/RegisterRequestDto";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthFormState {
    loginForm: LoginRequestDto,
    registerForm: RegisterRequestDto,
}

const initialState: AuthFormState = {
    loginForm: {
        email: '',
        password: ''
    },
    registerForm: {
        email: '',
        name: '',
        password: '',
        confirmPassword: ''
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
        clearFormState: () => initialState,
    }
});

export const { setLoginFormState, setRegisterFormState, clearFormState } = authFormSlice.actions;
export default authFormSlice.reducer;