import axios from 'axios';
const token = localStorage.getItem("token") || "";
const axiosInstance = axios.create({
    baseURL: 'http://localhost:8080/',
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        "authorization": `${token}`
    },
});

export default axiosInstance;