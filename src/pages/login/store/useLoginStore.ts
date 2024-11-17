import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import apiUtil from '../../../utils/ApiUtil';
import LoginResDto from '../dto/LoginResDto';

interface LoginState {
  accessToken?: string;
  refreshToken?: string;
  login: (id: string, password: string) => Promise<void>;
}

const useLoginStore = create<LoginState>()(
  persist(
    (set) => ({
      login: async (id: string, password: string) => {
        const response = await apiUtil.post<LoginResDto>('/login', {
          id,
          password,
        });
        set((state) => ({
          accessToken: response.data.accessToken,
          refreshToken: response.data.refreshToken,
        }));
      },
    }),
    { name: 'Authorization' },
  ),
);

export default useLoginStore;
