import axios from "axios";
import { useUserStore } from "@/stores/user";
const axiosClient = axios.create({
    baseURL:'https://lichess.org/api'
})
axiosClient.interceptors.request.use(config =>{
    config.headers.Authorization = `Bearer lip_pAHaT4fUAyoVJf3bXYKq`
    config.headers['Content-Type'] = 'application/json'
    // config.headers['ngrok-skip-browser-warning'] = '69420'
    return config;
})

export default axiosClient;