import { API_V1_URL } from "@/constant";
import axios from "axios";

const axiosClient_v1 = axios.create({
    baseURL: `${API_V1_URL}/v1`,
    withCredentials: true
});

export default axiosClient_v1;