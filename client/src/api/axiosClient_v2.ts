import axios from "axios";

const axiosClient_v2 = axios.create({
    baseURL: '/v2',
    withCredentials: false,
});

export default axiosClient_v2;