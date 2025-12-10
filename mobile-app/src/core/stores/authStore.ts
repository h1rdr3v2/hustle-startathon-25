import { createMMKV } from 'react-native-mmkv';
import { create } from 'zustand';
import { createJSONStorage, persist, StateStorage } from 'zustand/middleware';
import {
	AuthState,
	RunnerApplication,
	RunnerProfile,
	User,
} from '@/src/core/types';

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
	submitRunnerApplication: (
		application: Omit<RunnerApplication, 'id'>,
	) => Promise<void>;
	updateRunnerStatus: (
		status: 'pending' | 'approved' | 'rejected',
		rejectionReason?: string,
	) => void;
	updateRunnerProfile: (profile: Partial<RunnerProfile>) => void;
	toggleRunnerAvailability: () => void;
	hydrated: boolean;
	setHydrated: () => void;
}

export const useAuthStore = create<AuthStore>()(
	persist(
		(set, get) => ({
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

			submitRunnerApplication: async (application) => {
				// TODO: In production, this would call an API endpoint
				// For now, we'll simulate the submission
				const applicationWithId: RunnerApplication = {
					...application,
					id: `app-${Date.now()}`,
					status: 'pending',
					appliedAt: new Date(),
				};

				set((state) => ({
					user: state.user
						? {
								...state.user,
								runnerStatus: 'pending',
								runnerApplication: applicationWithId,
							}
						: null,
				}));

				// Simulate API call delay
				await new Promise((resolve) => setTimeout(resolve, 1000));
			},

			updateRunnerStatus: (status, rejectionReason) => {
				set((state) => {
					if (!state.user) return state;

					const updates: Partial<User> = {
						runnerStatus: status,
					};

					if (status === 'approved') {
						// Create initial runner profile when approved
						updates.runnerProfile = {
							userId: state.user.id,
							rating: 5.0,
							totalDeliveries: 0,
							completedDeliveries: 0,
							cancelledDeliveries: 0,
							totalEarnings: 0,
							availableEarnings: 0,
							isAvailable: true,
							acceptanceRate: 100,
							onTimeRate: 100,
							joinedAsRunnerAt: new Date(),
						};
					}

					if (status === 'rejected' && rejectionReason) {
						updates.runnerApplication = state.user.runnerApplication
							? {
									...state.user.runnerApplication,
									status,
									rejectionReason,
									reviewedAt: new Date(),
								}
							: undefined;
					}

					return {
						user: { ...state.user, ...updates },
					};
				});
			},

			updateRunnerProfile: (profileUpdates) => {
				set((state) => ({
					user:
						state.user && state.user.runnerProfile
							? {
									...state.user,
									runnerProfile: {
										...state.user.runnerProfile,
										...profileUpdates,
									},
								}
							: state.user,
				}));
			},

			toggleRunnerAvailability: () => {
				set((state) => ({
					user:
						state.user && state.user.runnerProfile
							? {
									...state.user,
									runnerProfile: {
										...state.user.runnerProfile,
										isAvailable:
											!state.user.runnerProfile
												.isAvailable,
									},
								}
							: state.user,
				}));
			},

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
