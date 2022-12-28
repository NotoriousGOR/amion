import { useSession } from "next-auth/react";
import create from "zustand";
import { trpc } from "../utils/trpc";

type Image = {
  url: string;
  prompt: string;
};
interface UserState {
  images: Image[] | [];
  isLoading: boolean;
  addImage: (url: string, prompt: string) => void;
  removeImage: (url: string, prompt: string) => void;
  setLoading: () => void;
}

export const useStore = create<UserState>((set) => {
  const { data: sessionData } = useSession();

  const dbImages = trpc.images.list.useQuery({
    limit: 20,
    userId: sessionData?.user?.id ?? "",
  }).data?.items;

  return {
    // initial state
    images: dbImages ? dbImages : [],
    isLoading: false,
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
    setLoading: () => {
      set((state) => ({
        isLoading: !state.isLoading,
      }));
    },
  };
});
