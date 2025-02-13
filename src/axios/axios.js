import axios from "axios";
import { useUserStore } from "@/stores/user";
const axiosClient = axios.create({
    // baseURL:'http://localhost:8000/api'
    baseURL:'https://e2a7-102-215-12-244.ngrok-free.app/api',
    headers: {
        'ngrok-skip-browser-warning': 'true'
    }
})
axiosClient.interceptors.request.use(config =>{
    config.headers.Authorization = `Bearer ${useUserStore().token || localStorage.getItem('token')}`
    config.headers['Content-Type'] = 'application/json'
    // config.headers['ngrok-skip-browser-warning'] = '69420'
    return config;
})



export default axiosClient;