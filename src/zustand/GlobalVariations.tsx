import { create } from 'zustand';

interface StoreState {
    data: {
        type: string;
        type_service: string;
        id_state: number | null;
        id_city: number | null;
        id_municipality: number | null;
    } | null;  // Data can be an object or null if not set
    setData: (x: StoreState['data']) => void;  // Accept the object type for setData
}

export const storeGlobal = create<StoreState>((set) => ({
    data: null,  // Initial state is null
    setData: (x) => set({ data: x }),  // Set the object data
}));

