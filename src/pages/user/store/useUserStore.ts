import { create } from 'zustand';
import ApiUtil from '../../../utils/ApiUtil';
import Page from '../../common/model/Page';
import User from '../model/User';

interface UserState {
  page: Page<User>;
  user?: User | null;
  getUsers: ({
    page,
    pageSize,
  }: {
    page?: number;
    pageSize?: number;
  }) => Promise<void>;
  getUser: (seq: number) => Promise<void>;
  clearUsers: () => void;
  setUser: (_user: User) => void;
  saveUser: (_user: User) => Promise<User>;
  deleteUser: (seq: number) => Promise<void>;
  resetUser: () => void;
}

const initialState = {
  content: [],
  pageable: { pageNumber: 0, pageSize: 10 },
  totalElements: 0,
  totalPages: 0,
};

const useUserStore = create<UserState>((set, get) => ({
  page: initialState,
  getUsers: async ({
    page = get().page?.pageable.pageNumber,
    pageSize = get().page?.pageable.pageSize,
  }: {
    page?: number;
    pageSize?: number;
  }) => {
    console.log(page, pageSize);

    const response = await ApiUtil.get<Page<User>>('/user/users', {
      page: page,
      size: pageSize,
    });
    set((state) => ({ page: response.data, users: response.data.content }));
  },
  getUser: async (seq) => {
    const response = await ApiUtil.get<User>(`/user/users/${seq}`);
    set((state) => ({ user: response.data }));
  },
  clearUsers: () => {
    set({ page: initialState });
  },
  setUser: (_user) => {
    set((state) => ({
      user: _user,
    }));
  },
  saveUser: async (_user) => {
    const response = await ApiUtil.post<User>('/user/users', _user);
    return response.data;
  },
  deleteUser: async (seq) => {
    await ApiUtil.delete(`/user/users/${seq}`);
  },
  resetUser: () => {
    set(() => ({
      user: null,
    }));
  },
}));

export default useUserStore;
