import { User } from "@/components/models/auth/User";
import { LoginRequestDto } from "@/components/models/Dto/LoginRequestDto"
import { SignUpRequestDto } from "@/components/models/Dto/SignUpRequestDto";
import axios from "axios"

export const loginSubmit = async (loginData: LoginRequestDto) : Promise<User | null> => {
    try {
        const response = await axios.post('/v1/auth/login', loginData);

        if (response.status != 200) {
            return null;
        }
        console.log(response);
        return response.data as User;
    } catch (error) {
        console.error("Fail to login", error);
        return null;
    }
}

export const signUpSubmit = async (signUpData: SignUpRequestDto) : Promise<User | null> => {
    try {
        const response = await axios.post('/v1/auth/register', signUpData);

        if (response.status != 200) {
            return null;
        }
        console.log(response);
        return response.data as User;
    } catch (error) {
        console.error("Fail to register", error);
        return null;
    }
}