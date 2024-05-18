import { create } from "zustand";

interface User {
  uuid: string;
  email: string | null;
}

interface AuthState {
  user: User | null;
  getUser: () => User | null;
  setUser: (user: User) => void;
  clearUser: () => void;
}

const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  getUser: () => get().user,
  setUser: (user) => set({ user }),
  clearUser: () => set({ user: null }),
}));

export default useAuthStore;
