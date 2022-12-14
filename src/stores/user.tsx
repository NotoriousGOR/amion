import create from "zustand";

interface UserState {
  images?: string[];
  addImage: (image: string) => void;
  removeImage: (image: string) => void;
}

export const useStore = create<UserState>((set) => ({
  // initial state
  images: [],
  // methods for manipulating state
  addImage: (image: string) => {
    set((state) => ({
      images: [...(state.images || []), image],
    }));
  },
  removeImage: (image: string) => {
    set((state) => ({
      images: state.images?.filter((x) => x !== image),
    }));
  },
}));
