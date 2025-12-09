import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
	mockCreateInstantTask,
	mockGetPredefinedItems,
	mockCompleteInstantTask,
	mockUpdateInstantTaskStatus,
} from '@/src/core/api';
import { InstantTask, PredefinedItem } from '@/src/core/types';
import { useInstantTaskStore } from '@/src/core/stores/instantTaskStore';

export const useCreateInstantTask = (availableRunners: any) => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (
			taskData: Omit<
				InstantTask,
				'id' | 'status' | 'createdAt' | 'isPaid' | 'paymentReleased'
			>,
		) =>
			mockCreateInstantTask(taskData, availableRunners).then(
				(res) => res.data,
			),
		onSuccess: (data) => {
			// store the created task in local store for immediate UI updates
			if (data?.task) {
				useInstantTaskStore.getState().addTask(data.task);
			}

			queryClient.invalidateQueries({ queryKey: ['instantTasks'] });
		},
	});
};

export const useCompleteInstantTask = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (taskId: string) =>
			mockCompleteInstantTask(taskId).then((r) => r.data),
		onSuccess: () =>
			queryClient.invalidateQueries({ queryKey: ['instantTasks'] }),
	});
};

export const useInstantTaskStatusUpdate = () => {
	return useMutation({
		mutationFn: (payload: { taskId: string; status: string }) =>
			mockUpdateInstantTaskStatus(payload.taskId, payload.status).then(
				(r) => r.data,
			),
	});
};

export const usePredefinedItem = (itemId: string | undefined) => {
	return useQuery<PredefinedItem | undefined>({
		queryKey: ['predefinedItem', itemId],
		queryFn: async () => {
			if (!itemId) return undefined;
			const res = await mockGetPredefinedItems();
			return (res.data || []).find((i) => i.id === itemId);
		},
		enabled: !!itemId,
	});
};
