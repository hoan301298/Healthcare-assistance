import { User } from "@/components/models/auth/User";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { checkAuth, login, logout, register } from "./authThunks";
import { AuthResponseDto } from "@/components/models/Dto/AuthResponseDto";

interface AuthState {
    user: User | null;
    isAuthenticated: boolean;
    loading: boolean;
    error: string | null;
    success: boolean;
    message: string;
}

const initialState: AuthState = {
    user: null,
    isAuthenticated: false,
    loading: false,
    error: null,
    success: false,
    message: ''
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        resetAuthState: (state) => {
            state.error = null;
            state.success = false;
            state.loading = false;
            state.message = '';
        }
    },
    extraReducers: (builder) => {
        // login
        builder.addCase(login.pending, (state) => {
            state.loading = true;
            state.error = null;
            state.success = false;
            state.message = 'pending';
        });

        builder.addCase(login.fulfilled, (state, action: PayloadAction<AuthResponseDto>) => {
            state.loading = false;
            state.user = action.payload.user;
            state.isAuthenticated = true;
            state.success = action.payload.success;
            state.message = action.payload.message;
        });

        builder.addCase(login.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload as string;
            state.message = action.payload as string;
            state.isAuthenticated = false;
        });

        // register
        builder.addCase(register.pending, (state) => {
            state.loading = true;
            state.error = null;
            state.success = false;
        });

        builder.addCase(register.fulfilled, (state, action: PayloadAction<AuthResponseDto>) => {
            state.loading = false;
            state.user = action.payload.user;
            state.isAuthenticated = true;
            state.success = action.payload.success;
        });

        builder.addCase(register.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload as string;
            state.message = action.payload as string;
            state.isAuthenticated = false;
        });
        
        // check auth
        builder.addCase(checkAuth.pending, (state) => {
            state.loading = true;
        });

        builder.addCase(checkAuth.fulfilled, (state, action: PayloadAction<AuthResponseDto>) => {
            state.loading = false;
            state.user = action.payload.user;
            state.isAuthenticated = true;
        });

        builder.addCase(checkAuth.rejected, (state) => {
            state.loading = false;
            state.user = null;
            state.isAuthenticated = false;
        });

        // logout
        builder.addCase(logout.fulfilled, (state) => {
            state.user = null;
            state.isAuthenticated = false;
            state.success = false;
            state.error = null;
        });
    }
})

export const { resetAuthState } = authSlice.actions;
export default authSlice.reducer;