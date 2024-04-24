import axios, { InternalAxiosRequestConfig } from 'axios';
const TEST_URL = process?.env?.ISSUU_API_SDK_URL;

export const api = axios.create({
    baseURL: TEST_URL || "https://api.issuu.com/v2/",
});

let token: string;
export const setToken = (newToken: string) => {
    token = newToken;
};

api.interceptors.request.use((config) => {
    if (token !== null) {
        config = ({
            ...config,
            headers: {
                'Authorization': `Bearer ${token}`,
            }
        }) as InternalAxiosRequestConfig;
    }

    return config;
}, (error) => Promise.reject(error));
