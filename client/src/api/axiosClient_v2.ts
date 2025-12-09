import axios from "axios";

const axiosClient_v2 = axios.create({
    baseURL: "/v2",
    withCredentials: true
});

export default axiosClient_v2;