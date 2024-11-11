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
    this.axiosInstance = axios.create({
      baseURL: 'http://localhost:8080',
      timeout: 15000,
      paramsSerializer: function (params) {
        return qs.stringify(params, { arrayFormat: 'comma' });
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
      (error) => {},
    );
    this.axiosInstance.interceptors.response.use(
      (config) => {
        this.useLoadingStore.getState().setLoading(false);
        return config;
      },
      (error) => {},
    );
  }

  get = async <T>(path: string, params?: any): Promise<AxiosResponse<T>> => {
    const response = await this.axiosInstance.get<T>(path, {
      params: params,
    });
    return response;
  };

  post = async <T>(path: string, data: T): Promise<AxiosResponse<T>> => {
    const response = await this.axiosInstance.post(path, data);
    return response;
  };

  delete = async <T>(path: string, params?: any): Promise<AxiosResponse<T>> => {
    const response = await this.axiosInstance.delete<T>(path, {
      params: params,
    });
    return response;
  };
}

export default ApiUtil.apiUtil;
