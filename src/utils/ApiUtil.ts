import axios, { AxiosInstance, AxiosResponse } from 'axios';
import qs from 'qs';
import { create, StoreApi, UseBoundStore } from 'zustand';

interface LoadingState {
  loading: boolean;
  setLoading: (loading: boolean) => void;
}

class ApiUtil {
  static apiUtil: ApiUtil = new ApiUtil();
  axiosInstance: AxiosInstance;
  useLoadingStore: UseBoundStore<StoreApi<LoadingState>>;

  constructor() {
    const accessToken = JSON.parse(
      localStorage.getItem('Authorization') ?? '{}',
    ).state?.accessToken;

    this.axiosInstance = axios.create({
      baseURL: 'http://localhost:8080',
      timeout: 15000,
      paramsSerializer: function (params) {
        return qs.stringify(params, { arrayFormat: 'comma' });
      },
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    });

    this.useLoadingStore = create<LoadingState>((set) => ({
      loading: false,
      setLoading: (loading) => set({ loading }),
    }));

    this.axiosInstance.interceptors.request.use(
      (config) => {
        this.useLoadingStore.getState().setLoading(true);
        return config;
      },
      (error) => {
        this.useLoadingStore.getState().setLoading(false);
      },
    );
    this.axiosInstance.interceptors.response.use(
      (config) => {
        this.useLoadingStore.getState().setLoading(false);
        return config;
      },
      (error) => {
        this.useLoadingStore.getState().setLoading(false);
        // window.location.href = '/';
      },
    );
  }

  get = async <T>(path: string, params?: any): Promise<AxiosResponse<T>> => {
    const response = await this.axiosInstance.get<T>(path, {
      params: params,
    });
    return response;
  };

  post = async <R>(path: string, data: any): Promise<AxiosResponse<R>> => {
    const response = await this.axiosInstance.post(path, data);
    return response;
  };

  put = async <T>(path: string, data: any): Promise<AxiosResponse<T>> => {
    const response = await this.axiosInstance.put(path, data);
    return response;
  };

  delete = async <T>(path: string, params?: any): Promise<AxiosResponse<T>> => {
    const response = await this.axiosInstance.delete<T>(path, {
      params: params,
    });
    return response;
  };
}

export const useLoadingStore = ApiUtil.apiUtil.useLoadingStore;

export default ApiUtil.apiUtil;
