import { create } from 'zustand';
import { InstantTask, InstantTaskStatus } from '@/src/core/types';

interface InstantTaskStore {
	tasks: InstantTask[];
	addTask: (task: InstantTask) => void;
	updateTaskStatus: (taskId: string, status: InstantTaskStatus) => void;
	assignRunner: (taskId: string, runnerId: string) => void;
	completeTask: (taskId: string) => void;
	cancelTask: (taskId: string) => void;
	getUserTasks: (userId: string) => InstantTask[];
	getRunnerTasks: (runnerId: string) => InstantTask[];
	getTaskById: (taskId: string) => InstantTask | undefined;
}

export const useInstantTaskStore = create<InstantTaskStore>((set, get) => ({
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
							...(status === 'assigned' && {
								assignedAt: new Date(),
							}),
							...(status === 'in_progress' && {
								startedAt: new Date(),
							}),
							...(status === 'delivered' && {
								deliveredAt: new Date(),
							}),
							...(status === 'completed' && {
								completedAt: new Date(),
								paymentReleased: true,
							}),
						}
					: task,
			),
		})),

	assignRunner: (taskId, runnerId) =>
		set((state) => ({
			tasks: state.tasks.map((task) =>
				task.id === taskId
					? {
							...task,
							runnerId,
							status: 'assigned',
							assignedAt: new Date(),
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
							isPaid: true,
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
