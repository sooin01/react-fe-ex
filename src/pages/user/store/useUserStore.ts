import axios from 'axios';
import { create } from 'zustand';
import ApiUtil from '../../../utils/ApiUtil';
import User from '../model/User';

interface Page<T> {
  content: T[];
}

interface UserState {
  users: User[];
  user?: User;
  getUsers: () => Promise<void>;
  getUser: (seq: number) => Promise<void>;
  clearUsers: () => void;
  setUser: (_user: User) => void;
  saveUser: (user: User) => Promise<void>;
  deleteUser: (seq: number) => Promise<void>;
}

axios.interceptors.request.use(
  (config) => {
    return config;
  },
  function (error) {
    return Promise.reject(error);
  },
);

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
  saveUser: async (user) => {
    await axios.post('/user/users', user);
  },
  deleteUser: async (seq) => {
    await axios.delete(`/user/users/${seq}`);
    // set((state) => ({
    //   users: state.users.filter((user) => user.seq !== seq),
    // }));
  },
}));

export default useUserStore;
