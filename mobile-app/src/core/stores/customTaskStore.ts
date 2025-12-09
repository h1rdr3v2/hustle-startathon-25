import { create } from 'zustand';
import { CustomTask, CustomTaskStatus } from '@/src/core/types';

interface CustomTaskStore {
	tasks: CustomTask[];
	addTask: (task: CustomTask) => void;
	updateTaskStatus: (taskId: string, status: CustomTaskStatus) => void;
	acceptTask: (taskId: string, runnerId: string) => void;
	completeTask: (taskId: string) => void;
	cancelTask: (taskId: string) => void;
	getOpenTasks: () => CustomTask[];
	getUserTasks: (userId: string) => CustomTask[];
	getRunnerTasks: (runnerId: string) => CustomTask[];
	getTaskById: (taskId: string) => CustomTask | undefined;
}

export const useCustomTaskStore = create<CustomTaskStore>((set, get) => ({
	tasks: [],

	addTask: (task) =>
		set((state) => ({
			tasks: [...state.tasks, task],
		})),

	updateTaskStatus: (taskId, status) =>
		set((state) => ({
			tasks: state.tasks.map((task) =>
				task.id === taskId
					? {
							...task,
							status,
							...(status === 'accepted' && {
								acceptedAt: new Date(),
							}),
							...(status === 'in_progress' && {
								startedAt: new Date(),
							}),
							...(status === 'awaiting_confirmation' && {
								submittedAt: new Date(),
							}),
							...(status === 'completed' && {
								completedAt: new Date(),
								paymentReleased: true,
							}),
						}
					: task,
			),
		})),

	acceptTask: (taskId, runnerId) =>
		set((state) => ({
			tasks: state.tasks.map((task) =>
				task.id === taskId
					? {
							...task,
							runnerId,
							status: 'accepted',
							acceptedAt: new Date(),
						}
					: task,
			),
		})),

	completeTask: (taskId) =>
		set((state) => ({
			tasks: state.tasks.map((task) =>
				task.id === taskId
					? {
							...task,
							status: 'completed',
							completedAt: new Date(),
							paymentReleased: true,
						}
					: task,
			),
		})),

	cancelTask: (taskId) =>
		set((state) => ({
			tasks: state.tasks.map((task) =>
				task.id === taskId
					? {
							...task,
							status: 'cancelled',
						}
					: task,
			),
		})),

	getOpenTasks: () => {
		return get().tasks.filter((task) => task.status === 'open');
	},

	getUserTasks: (userId) => {
		return get().tasks.filter((task) => task.userId === userId);
	},

	getRunnerTasks: (runnerId) => {
		return get().tasks.filter((task) => task.runnerId === runnerId);
	},

	getTaskById: (taskId) => {
		return get().tasks.find((task) => task.id === taskId);
	},
}));
