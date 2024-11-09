import axios from 'axios';
import { create } from 'zustand';

interface User {
  id: number;
  name: string;
  email: string;
}

interface UserState {
  users: User[];
  fetchUsers: () => void;
  clearUsers: () => void;
}

const useUserStore = create<UserState>((set) => ({
  users: [],
  fetchUsers: async () => {
    const response = await axios.get<User[]>(
      'https://jsonplaceholder.typicode.com/users',
    );
    set((state) => ({ users: response.data }));
  },
  clearUsers: () => {
    set({ users: [] });
  },
}));

export default useUserStore;
