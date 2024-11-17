import { create } from 'zustand';
import apiUtil from '../../../utils/ApiUtil';
import LoginReqDto from '../dto/LoginReqDto';
import LoginResDto from '../dto/LoginResDto';

interface LoginState {
  loginReqDto?: LoginReqDto;
  login: (id: string, password: string) => Promise<LoginResDto>;
}

const useLoginStore = create<LoginState>((set) => ({
  login: async (id: string, password: string) => {
    const response = await apiUtil.post<LoginResDto>('/login', {
      id,
      password,
    });
    return response.data;
  },
}));

export default useLoginStore;
