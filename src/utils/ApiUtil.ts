import axios, { AxiosResponse } from 'axios';
import { create } from 'zustand';

interface LoadingState {
  loading: boolean;
  setLoading: (loading: boolean) => void;
}

export const useLoadingStore = create<LoadingState>((set) => ({
  loading: false,
  setLoading: (loading) => set({ loading }),
}));

const axiosInstance = axios.create({
  baseURL: 'http://localhost:8080',
  timeout: 15000,
});
axiosInstance.interceptors.request.use(
  (config) => {
    useLoadingStore.getState().setLoading(true);
    return config;
  },
  (error) => {},
);
axiosInstance.interceptors.response.use(
  (config) => {
    useLoadingStore.getState().setLoading(false);
    return config;
  },
  (error) => {},
);

class ApiUtil {
  static get = async <T>(
    path: string,
    params?: any,
  ): Promise<AxiosResponse<T>> => {
    const response = await axiosInstance.get<T>(path, {
      params: params,
    });
    return response;
  };
}

export default ApiUtil;
