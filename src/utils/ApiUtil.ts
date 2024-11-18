import axios, { AxiosInstance, AxiosResponse } from 'axios';
import qs from 'qs';
import { create, StoreApi, UseBoundStore } from 'zustand';
import Confirm from '../components/Confirm';

interface LoadingState {
  loading: boolean;
  setLoading: (loading: boolean) => void;
}

class ApiUtil {
  static apiUtil: ApiUtil = new ApiUtil();
  axiosInstance: AxiosInstance;
  useLoadingStore: UseBoundStore<StoreApi<LoadingState>>;
  isError = false;
  navigate: ((path: string) => void) | null = null;

  init(navigate: (path: string) => void) {
    this.navigate = navigate;
  }

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
      (error) => {
        this.useLoadingStore.getState().setLoading(false);
      },
    );
    this.axiosInstance.interceptors.response.use(
      (response) => {
        this.useLoadingStore.getState().setLoading(false);
        return response;
      },
      (error) => {
        this.useLoadingStore.getState().setLoading(false);

        if (!this.isError) {
          if (error.status === 403) {
            this.isError = true;
            Confirm({
              title: 'Login session expires.',
              onOk() {
                ApiUtil.apiUtil.goLogin();
              },
              afterClose() {
                ApiUtil.apiUtil.isError = false;
              },
            });
          }
        }
      },
    );
  }

  goLogin = () => {
    if (this.navigate) {
      localStorage.clear();
      this.navigate('/');
    }
  };

  getAccessToken = () => {
    const accessToken = JSON.parse(
      localStorage.getItem('Authorization') ?? '{}',
    ).state?.accessToken;

    if (accessToken) {
      return `Bearer ${accessToken}`;
    }

    return '';
  };

  get = async <T>(path: string, params?: any): Promise<AxiosResponse<T>> => {
    const response = await this.axiosInstance.get<T>(path, {
      params: params,
      headers: {
        Authorization: this.getAccessToken(),
      },
    });
    return response;
  };

  post = async <R>(path: string, data: any): Promise<AxiosResponse<R>> => {
    const response = await this.axiosInstance.post(path, data, {
      headers: {
        Authorization: this.getAccessToken(),
      },
    });
    return response;
  };

  put = async <T>(path: string, data: any): Promise<AxiosResponse<T>> => {
    const response = await this.axiosInstance.put(path, data, {
      headers: {
        Authorization: this.getAccessToken(),
      },
    });
    return response;
  };

  delete = async <T>(path: string, params?: any): Promise<AxiosResponse<T>> => {
    const response = await this.axiosInstance.delete<T>(path, {
      params: params,
      headers: {
        Authorization: this.getAccessToken(),
      },
    });
    return response;
  };
}

export const useLoadingStore = ApiUtil.apiUtil.useLoadingStore;

export default ApiUtil.apiUtil;
