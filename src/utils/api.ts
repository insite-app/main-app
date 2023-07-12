import axios, { AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import { getBffHost } from '../config/getConfig';

const api = axios.create({
  baseURL: getBffHost(),
});

// Function to refresh token, replace with your actual implementation
async function getNewToken(): Promise<string> {
  // Retrieve your refreshToken from wherever it's stored (localStorage, cookies, etc)
  const refreshToken = localStorage.getItem('refreshToken');

  try {
    const response = await axios.post(`${getBffHost()}/auth/refresh`, { refreshToken });

    if (response.status === 201) {
      const newAccessToken = response.data.accessToken;
      return newAccessToken;
    }
  } catch (error) {
    console.log('Error while refreshing token', error);
    throw error;
  }
}

const interceptorIgnorePaths = ['/auth/login', '/auth/register'];
// Add a request interceptor
api.interceptors.request.use(
  async (config: InternalAxiosRequestConfig) => {
    // Do something before request is sent
    const token = localStorage.getItem('accessToken');

    if (token && !interceptorIgnorePaths.includes(config.url || '')) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    // Do something with request error
    return Promise.reject(error);
  },
);

// Add a response interceptor
api.interceptors.response.use(
  (response: AxiosResponse) => {
    // Any status code that lie within the range of 2xx cause this function to trigger
    return response;
  },
  async (error) => {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const newToken = await getNewToken();
      localStorage.setItem('accessToken', newToken);
      api.defaults.headers.common['Authorization'] = `Bearer ${newToken}`;
      return api(originalRequest);
    }
    return Promise.reject(error);
  },
);

export default api;
