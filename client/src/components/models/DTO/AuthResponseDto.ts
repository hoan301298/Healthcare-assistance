import { User } from "../auth/User";

export interface AuthResponseDto {
    success: boolean;
    message: string;
    user?: User;
}