import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { mockGetAllRunners, mockGetAvailableRunners } from '@/src/core/api';
import { ErrandLocation, Runner, SelectedRunner } from '@/src/core/types';

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

// Mock runners data for errand flow
const MOCK_SELECTED_RUNNERS: SelectedRunner[] = [
	{
		id: 'runner-1',
		name: 'Chidi Okeke',
		rating: 4.8,
		totalDeliveries: 156,
		distance: 1.2,
		estimatedArrival: 8,
		phone: '+2348012345678',
		profilePicture: undefined,
	},
	{
		id: 'runner-2',
		name: 'Amaka Nwosu',
		rating: 4.9,
		totalDeliveries: 243,
		distance: 2.1,
		estimatedArrival: 12,
		phone: '+2348098765432',
		profilePicture: undefined,
	},
	{
		id: 'runner-3',
		name: 'Emeka Eze',
		rating: 4.7,
		totalDeliveries: 89,
		distance: 1.8,
		estimatedArrival: 10,
		phone: '+2348123456789',
		profilePicture: undefined,
	},
	{
		id: 'runner-4',
		name: 'Ngozi Obi',
		rating: 4.9,
		totalDeliveries: 312,
		distance: 2.5,
		estimatedArrival: 15,
		phone: '+2348087654321',
		profilePicture: undefined,
	},
];

interface UseErrandRunnersParams {
	pickupLocation: ErrandLocation | null;
	autoSelect?: boolean;
}

export const useErrandRunners = ({
	pickupLocation,
	autoSelect = false,
}: UseErrandRunnersParams) => {
	const [runners, setRunners] = useState<SelectedRunner[]>([]);
	const [loading, setLoading] = useState(false);
	const [selectedRunner, setSelectedRunner] = useState<SelectedRunner | null>(
		null,
	);

	useEffect(() => {
		if (pickupLocation) {
			fetchNearbyRunners();
		}
	}, [pickupLocation]);

	const fetchNearbyRunners = async () => {
		try {
			setLoading(true);

			// Simulate API call delay
			await new Promise((resolve) => setTimeout(resolve, 800));

			// Sort runners by distance
			const sortedRunners = [...MOCK_SELECTED_RUNNERS].sort(
				(a, b) => a.distance - b.distance,
			);

			setRunners(sortedRunners);

			// Auto-select closest runner if enabled
			if (autoSelect && sortedRunners.length > 0) {
				setSelectedRunner(sortedRunners[0]);
			}
		} catch (error) {
			console.error('Failed to fetch runners:', error);
		} finally {
			setLoading(false);
		}
	};

	const selectRunner = (runner: SelectedRunner) => {
		setSelectedRunner(runner);
	};

	const clearSelection = () => {
		setSelectedRunner(null);
	};

	return {
		runners,
		loading,
		selectedRunner,
		selectRunner,
		clearSelection,
		refetch: fetchNearbyRunners,
	};
};
