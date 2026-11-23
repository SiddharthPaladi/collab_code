import axios from 'axios';

const axiosinstance = axios.create({
    baseURL: import.meta.env.VITE_API_URL || "http://127.0.0.1:3000",
    withCredentials: true,  // Ensures cookies are sent with every request
    headers: {
        "Authorization": `Bearer ${localStorage.getItem('token')}`
    },
});

export default axiosinstance;
