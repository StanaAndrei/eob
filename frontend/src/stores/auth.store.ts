import { create, StateCreator } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware';

interface AuthState {
    authToken: string | null,
    setAuthToken: (authToken: string) => void,
    rmAuthToken: () => void,
    isLoggedIn: () => boolean,
}

export const AUTH_KEY = 'auth-st';
const _store: StateCreator<AuthState> = (set, get) => ({
    authToken: null,
    setAuthToken: (authToken: string) => set({ authToken }),
    rmAuthToken: () => set({ authToken: null }),
    isLoggedIn: () => get().authToken != null,
});

const storageOpt = {
    name: AUTH_KEY,
    storage: createJSONStorage(() => localStorage)
};

const useAuthStore = create<AuthState>()(
    persist(_store, storageOpt)
);

export const getAuthToken = (): string | null => {
    return useAuthStore.getState().authToken;
}

export default useAuthStore;