import { create } from 'zustand';
import { User, AuthState } from '@/src/core/types';

interface AuthStore extends AuthState {
	setAuth: (user: User, token: string) => void;
	logout: () => void;
	updateUser: (user: Partial<User>) => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
	isAuthenticated: false,
	user: null,
	token: null,

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
}));
