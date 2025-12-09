import useAuth from "@/hooks/auth/useAuth";
import { ReactNode, useEffect } from "react";

export default function AuthProvider({ children }: {children: ReactNode}) {
    const { checkAuth } = useAuth();
    
    useEffect(() => {
        checkAuth();
    }, []);

    return <>{children}</>
}