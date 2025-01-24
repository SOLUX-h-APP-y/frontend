import axios from 'axios';
import { API_BASE_URL } from 'react-native-dotenv';

const api = axios.create({
    baseURL: API_BASE_URL,
    timeout: 5000,
    headers: {
        'Content-Type': 'application/json',
    },
});

// JWT 토큰 설정 함수
export const setAuthToken = (token) => {
    if (token) {
        api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
        delete api.defaults.headers.common['Authorization'];
    }
};

// Axios 응답 인터셉터
api.interceptors.response.use(
    (response) => response,
    async (error) => {
        if (error.response?.status === 401) {
            console.error('Unauthorized: Token expired or invalid');
            // 토큰 갱신 로직 추가 가능
        }
        return Promise.reject(error);
    }
);

export default api;
