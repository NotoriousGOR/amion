import { useSession } from "next-auth/react";
import create from "zustand";
import { trpc } from "../utils/trpc";

type Image = {
  url: string;
  prompt: string;
};
interface UserState {
  images: Image[] | [];
  addImage: (url: string, prompt: string) => void;
  removeImage: (url: string, prompt: string) => void;
}

export const useStore = create<UserState>((set) => ({
  // initial state
  images: [],
  // methods for manipulating state
  addImage: (url, prompt) => {
    set((state) => ({
      images: [
        ...state.images,
        {
          url: url,
          prompt: prompt,
        } as Image,
      ],
    }));
  },
  removeImage: (url: string) => {
    set((state) => ({
      images: state.images?.filter((x) => x.url !== url),
    }));
  },
}));
