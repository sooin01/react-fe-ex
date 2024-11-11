import { create } from 'zustand';
import ApiUtil from '../../../utils/ApiUtil';
import User from '../model/User';

interface Page<T> {
  content: T[];
}

interface UserState {
  users: User[];
  user?: User | null;
  getUsers: () => Promise<void>;
  getUser: (seq: number) => Promise<void>;
  clearUsers: () => void;
  setUser: (_user: User) => void;
  saveUser: (_user: User) => Promise<User>;
  deleteUser: (seq: number) => Promise<void>;
  resetUser: () => void;
}

const useUserStore = create<UserState>((set) => ({
  users: [],
  getUsers: async () => {
    const response = await ApiUtil.get<Page<User>>('/user/users');
    set((state) => ({ users: response.data.content }));
  },
  getUser: async (seq) => {
    const response = await ApiUtil.get<User>(`/user/users/${seq}`);
    set((state) => ({ user: response.data }));
  },
  clearUsers: () => {
    set({ users: [] });
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
    // set((state) => ({
    //   users: state.users.filter((user) => user.seq !== seq),
    // }));
  },
  resetUser: () => {
    set((state) => ({
      user: null,
    }));
  },
}));

export default useUserStore;
