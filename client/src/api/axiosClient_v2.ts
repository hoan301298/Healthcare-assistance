import axios from "axios";

const axiosClient_v2 = axios.create({
    baseURL: `${import.meta.env.VITE_SPRINGBOOT_SERVER_API}/v2`,
    withCredentials: true
});

export default axiosClient_v2;