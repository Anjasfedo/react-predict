import { create } from "zustand";

interface PostState {
  posts: [];
}

const usePostStore = create<PostState>()(() => ({
  posts: [],
}));

export default usePostStore;
