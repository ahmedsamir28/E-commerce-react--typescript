import axios from "axios";

export const BaseUrl = 'http://127.0.0.1:8000'

export const axiosInstance = axios.create({
    baseURL: "http://127.0.0.1:8000",
})



