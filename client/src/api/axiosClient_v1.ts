import axios from "axios";

const axiosClient_v1 = axios.create({
    baseURL: import.meta.env.VITE_NODE_SERVER_API,
    withCredentials: true
});

export default axiosClient_v1;