import axios from "axios";

const axiosClient_v1 = axios.create({
    baseURL: "/v1",
    withCredentials: true
});

export default axiosClient_v1;