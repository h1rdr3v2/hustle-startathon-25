import { useQuery } from '@tanstack/react-query';
import { mockGetAvailableRunners, mockGetAllRunners } from '@/src/core/api';
import { Runner } from '@/src/core/types';

export const useAvailableRunners = () => {
	return useQuery<Runner[]>({
		queryKey: ['availableRunners'],
		queryFn: () => mockGetAvailableRunners().then((r) => r.data || []),
	});
};

export const useAllRunners = () => {
	return useQuery<Runner[]>({
		queryKey: ['allRunners'],
		queryFn: () => mockGetAllRunners().then((r) => r.data || []),
	});
};
