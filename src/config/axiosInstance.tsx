import axios from 'axios';
import { toast } from 'react-toastify';
import { router } from '../main';
const axiosInstance = axios.create({
  baseURL:
    import.meta.env.VITE_API_BASE_URL +
    ':' +
    import.meta.env.VITE_API_PORT +
    '/' +
    import.meta.env.VITE_API_PREFIX +
    '/',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosInstance.interceptors.request.use(
  async (config) => {
    const token = await getToken();

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response.status === 403) {
      // location.assign('/');
      toast.error(error.response.data.message);
      router.navigate({ to: '/' });
    }
    if (error.response.status === 401) {
      toast.error('please login');
      router.navigate({ to: '/' });
    }
    console.log(error.response.status);
    return Promise.reject(error);
  }
);

// Export the instance so it can be used in other files

export default axiosInstance;

function getToken() {
  return localStorage.getItem('token');
}
