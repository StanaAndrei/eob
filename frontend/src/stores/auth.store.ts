import { jwtDecode } from 'jwt-decode';
import { create, StateCreator } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware';

export interface TokData {
    id: number;
    rolePriority: number,
    iat: number,
}

export interface AuthState {
    authToken: string | null,
    setAuthToken: (authToken: string) => void,
    rmAuthToken: () => void,
    isLoggedIn: () => boolean,
    getTokData: () => TokData | null,
}


export const AUTH_KEY = 'auth-st';
const _store: StateCreator<AuthState> = (set, get) => ({
    authToken: null,
    setAuthToken: (authToken: string) => set({ authToken }),
    rmAuthToken: () => set({ authToken: null }),
    isLoggedIn: () => get().authToken != null,
    getTokData: () => {
        const authToken = get().authToken;
        if (authToken == null) {
            return null;
        }
        const decodedData: TokData = jwtDecode(get().authToken as string);
        return decodedData;
    }
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