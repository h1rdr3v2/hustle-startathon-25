import { create } from 'zustand';
import { persist, createJSONStorage, StateStorage } from 'zustand/middleware';
import { createMMKV } from 'react-native-mmkv';
import { User, AuthState } from '@/src/core/types';

const mmkvInstance = createMMKV();

const mmkvStorage: StateStorage = {
	setItem: (name, value) => {
		return mmkvInstance.set(name, value);
	},
	getItem: (name) => {
		const value = mmkvInstance.getString(name);
		return value ?? null;
	},
	removeItem: (name) => {
		return mmkvInstance.remove(name);
	},
};

interface AuthStore extends AuthState {
	setAuth: (user: User, token: string) => void;
	logout: () => void;
	updateUser: (user: Partial<User>) => void;
	hydrated: boolean;
	setHydrated: () => void;
}

export const useAuthStore = create<AuthStore>()(
	persist(
		(set) => ({
			isAuthenticated: false,
			user: null,
			token: null,
			hydrated: false,

			setAuth: (user, token) =>
				set({
					isAuthenticated: true,
					user,
					token,
				}),

			logout: () =>
				set({
					isAuthenticated: false,
					user: null,
					token: null,
				}),

			updateUser: (updates) =>
				set((state) => ({
					user: state.user ? { ...state.user, ...updates } : null,
				})),

			setHydrated: () => set({ hydrated: true }),
		}),
		{
			name: 'auth-storage',
			storage: createJSONStorage(() => mmkvStorage),
			onRehydrateStorage: () => (state) => {
				state?.setHydrated();
			},
		},
	),
);
