import { create } from 'zustand';
import { Runner } from '@/src/core/types';

interface RunnerStore {
	runners: Runner[];
	setRunners: (runners: Runner[]) => void;
	updateRunnerAvailability: (runnerId: string, isAvailable: boolean) => void;
	updateRunnerLocation: (
		runnerId: string,
		latitude: number,
		longitude: number,
	) => void;
	getAvailableRunners: () => Runner[];
	getRunnerById: (runnerId: string) => Runner | undefined;
}

export const useRunnerStore = create<RunnerStore>((set, get) => ({
	runners: [],

	setRunners: (runners) =>
		set({
			runners,
		}),

	updateRunnerAvailability: (runnerId, isAvailable) =>
		set((state) => ({
			runners: state.runners.map((runner) =>
				runner.id === runnerId ? { ...runner, isAvailable } : runner,
			),
		})),

	updateRunnerLocation: (runnerId, latitude, longitude) =>
		set((state) => ({
			runners: state.runners.map((runner) =>
				runner.id === runnerId
					? {
							...runner,
							currentLocation: {
								...runner.currentLocation,
								latitude,
								longitude,
							},
						}
					: runner,
			),
		})),

	getAvailableRunners: () => {
		return get().runners.filter((runner) => runner.isAvailable);
	},

	getRunnerById: (runnerId) => {
		return get().runners.find((runner) => runner.id === runnerId);
	},
}));
