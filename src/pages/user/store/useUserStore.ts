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
  getUser: (userId: string) => Promise<void>;
  clearUsers: () => void;
  setUser: (_user: User) => void;
  saveUser: (_user: User) => Promise<User>;
  deleteUser: (userIds: string[]) => Promise<void>;
}

const initialState = {
  content: [],
  pageable: { pageNumber: 0, pageSize: 5 },
  totalElements: 0,
  totalPages: 0,
};

const useUserStore = create<UserState>((set, get) => ({
  page: initialState,
  getUsers: async ({
    page = get().page?.pageable.pageNumber,
    pageSize = get().page?.pageable.pageSize,
  }) => {
    const response = await ApiUtil.get<Page<User>>('/user/users', {
      page: page,
      size: pageSize,
    });
    set((state) => ({
      page: response.data,
      user: null,
    }));
  },
  getUser: async (userId) => {
    const response = await ApiUtil.get<User>(`/user/users/${userId}`);
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
  deleteUser: async (userIds) => {
    await ApiUtil.delete('/user/users', {
      userIds: userIds,
    });
  },
}));

export default useUserStore;
