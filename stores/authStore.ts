import { getAuth, onAuthStateChanged } from "firebase/auth";
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
  iniinitializeAuthListener: () => void;
}

const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  getUser: () => get().user,
  setUser: (user) => set({ user }),
  clearUser: () => set({ user: null }),
  iniinitializeAuthListener: () => {
    const auth = getAuth();
    onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        const user: User = {
          uuid: firebaseUser.uid,
          email: firebaseUser.email,
        };
        set({ user });
      } else {
        set({ user: null });
      }
    });
  },
}));

export default useAuthStore;
