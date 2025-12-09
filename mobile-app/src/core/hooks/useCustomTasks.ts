import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
	mockCreateCustomTask,
	mockGetOpenTasks,
	mockAcceptCustomTask,
	mockGetUserCustomTasks,
} from '@/src/core/api';
import { CustomTask } from '@/src/core/types';

export const useOpenCustomTasks = (page = 1, pageSize = 20) => {
	return useQuery({
		queryKey: ['openCustomTasks', page, pageSize],
		queryFn: () => mockGetOpenTasks(page, pageSize).then((r) => r.data),
	});
};

export const useCreateCustomTask = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (
			taskData: Omit<
				CustomTask,
				| 'id'
				| 'status'
				| 'createdAt'
				| 'amountLocked'
				| 'paymentReleased'
			>,
		) => mockCreateCustomTask(taskData).then((r) => r.data),
		onSuccess: () =>
			queryClient.invalidateQueries({ queryKey: ['openCustomTasks'] }),
	});
};

export const useAcceptCustomTask = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (payload: { taskId: string; runnerId: string }) =>
			mockAcceptCustomTask(payload.taskId, payload.runnerId).then(
				(r) => r.data,
			),
		onSuccess: () =>
			queryClient.invalidateQueries({ queryKey: ['openCustomTasks'] }),
	});
};

export const useUserCustomTasks = (userId: string) => {
	return useQuery({
		queryKey: ['userCustomTasks', userId],
		queryFn: () => mockGetUserCustomTasks(userId).then((r) => r.data || []),
		enabled: !!userId,
	});
};
