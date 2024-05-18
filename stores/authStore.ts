import { create } from "zustand";
import { auth } from "@configs/firebase";
import { onAuthStateChanged, Unsubscribe } from "firebase/auth";

interface User {
  uuid: string;
  email: string | null;
}

interface AuthState {
  user: User | null;
  getUser: () => User | null;
  setUser: (user: User) => void;
  clearUser: () => void;
  initializeAuthListener: () => Unsubscribe;
}

const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  getUser: () => get().user,
  setUser: (user) => set({ user }),
  clearUser: () => set({ user: null }),
  initializeAuthListener: () => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
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
    return unsubscribe;
  },
}));

export default useAuthStore;
