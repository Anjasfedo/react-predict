import {create} from "zustand";

interface JwtState {
  token: string;
  setToken: (token: string) => void;
  clearToken: () => void;
}

const useJwtStore = create<JwtState>((set) => ({
  token: localStorage.getItem("token") || "",
  setToken: (token: string) => {
    localStorage.setItem("token", token);
    set({ token });
  },
  clearToken: () => {
    localStorage.removeItem("token");
    set({ token: "" });
  },
}));

export default useJwtStore;
