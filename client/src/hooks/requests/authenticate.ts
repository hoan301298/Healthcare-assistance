import { AuthResponseDto } from "@/components/models/Dto/AuthResponseDto";
import { LoginRequestDto } from "@/components/models/Dto/LoginRequestDto"
import { SignUpRequestDto } from "@/components/models/Dto/SignUpRequestDto";
import axios from "axios"

export const loginSubmit = async (loginData: LoginRequestDto) : Promise<AuthResponseDto> => {
    try {
        const response = await axios.post('/v1/auth/login', loginData, { withCredentials: true });
        return response.data as AuthResponseDto;
    } catch (error) {
        console.error("Fail to login", error.response);
        return error.response.data as AuthResponseDto;
    }
}

export const signUpSubmit = async (signUpData: SignUpRequestDto) : Promise<AuthResponseDto> => {
    try {
        const response = await axios.post('/v1/auth/register', signUpData, { withCredentials: true });
        return response.data as AuthResponseDto;
    } catch (error) {
        console.error("Fail to register", error);
        return error.response.data as AuthResponseDto;
    }
}