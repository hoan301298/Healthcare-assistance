import useAuth from "@/hooks/auth/useAuth";
import { ReactNode, useEffect } from "react";

export default function AuthProvider({ children }: {children: ReactNode}) {
    const { 
        checkAuth,
        isAuthenticated 
    } = useAuth();
    
    useEffect(() => {
        if (isAuthenticated) return;
        checkAuth();
    }, [isAuthenticated]);

    return <>{children}</>
}