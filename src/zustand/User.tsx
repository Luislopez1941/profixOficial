import { create } from 'zustand';

interface StoreState {
    user: boolean;
    setUser: (x: boolean) => void; // Cambiar 'any' a 'boolean'
}

export const storeLogin = create<StoreState>((set) => ({
    user: false,
    setUser: (x) => set({ user: x }),
}));
