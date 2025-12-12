import useAuth from "../auth/useAuth";
import useAuthForm from "../auth/useAuthForm";
import useSupport from "./useSupport";

const useHandleSupport = () => {
    const {
        fetchChatDetail
    } = useSupport();
    const {
        login,
        isAuthenticated
    } = useAuth();
    const {
        loginForm,
        clearForms
    } = useAuthForm();

    const handleStartChat = async (e: React.FormEvent) => {
        e.preventDefault();

        if (isAuthenticated) return;
        const loginResponse = await login(loginForm);
        if (loginResponse.success) {
            clearForms()
            await fetchChatDetail();
        }
    }

    return {
        handleStartChat
    }
}

export default useHandleSupport;