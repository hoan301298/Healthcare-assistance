import { API_V2_URL } from "@/constant";
import axios from "axios";

const axiosClient_v2 = axios.create({
    baseURL: `${API_V2_URL}/v2`,
    withCredentials: false,
});

export default axiosClient_v2;