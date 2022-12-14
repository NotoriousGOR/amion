import { useSession } from "next-auth/react";
import create from "zustand";
import { trpc } from "../utils/trpc";

const { data: sessionData } = useSession();

interface UserState {
  images?: string[];
  addImage: (image: string) => void;
  addImages: (images: string[]) => void;
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
  addImages: (images: string[]) => {
    set((state) => ({
      images: images,
    }));
  },
  removeImage: (image: string) => {
    set((state) => ({
      images: state.images?.filter((x) => x !== image),
    }));
  },
}));
