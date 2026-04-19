import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AppState {
  wishlist: string[];
  toggleWishlist: (id: string) => void;
  isInWishlist: (id: string) => boolean;
}

export const useStore = create<AppState>()(
  persist(
    (set, get) => ({
      wishlist: [],
      toggleWishlist: (id) =>
        set((state) => ({
          wishlist: state.wishlist.includes(id)
            ? state.wishlist.filter((wId) => wId !== id)
            : [...state.wishlist, id],
        })),
      isInWishlist: (id) => get().wishlist.includes(id),
    }),
    {
      name: 'estate-x-storage',
    }
  )
);
