// Mock API functions for runners

import { Runner, ApiResponse } from '@/src/core/types';
import { mockDelay } from '../utils/helpers';
import { mockRunners } from '../mock/mockRunners';

/**
 * Get all available runners
 */
export const mockGetAvailableRunners = async (): Promise<
	ApiResponse<Runner[]>
> => {
	await mockDelay(600);

	const availableRunners = mockRunners.filter((runner) => runner.isAvailable);

	return {
		success: true,
		data: availableRunners,
	};
};

/**
 * Get all runners (including unavailable)
 */
export const mockGetAllRunners = async (): Promise<ApiResponse<Runner[]>> => {
	await mockDelay(600);

	return {
		success: true,
		data: mockRunners,
	};
};

/**
 * Get runner by ID
 */
export const mockGetRunner = async (
	runnerId: string,
): Promise<ApiResponse<Runner>> => {
	await mockDelay(400);

	const runner = mockRunners.find((r) => r.id === runnerId);

	if (!runner) {
		return {
			success: false,
			error: 'Runner not found',
		};
	}

	return {
		success: true,
		data: runner,
	};
};

/**
 * Update runner availability
 */
export const mockUpdateRunnerAvailability = async (
	runnerId: string,
	isAvailable: boolean,
): Promise<ApiResponse<boolean>> => {
	await mockDelay(500);

	return {
		success: true,
		data: true,
		message: `Runner availability updated to ${
			isAvailable ? 'available' : 'unavailable'
		}`,
	};
};

/**
 * Update runner location
 */
export const mockUpdateRunnerLocation = async (
	runnerId: string,
	latitude: number,
	longitude: number,
): Promise<ApiResponse<boolean>> => {
	await mockDelay(300);

	return {
		success: true,
		data: true,
		message: 'Runner location updated',
	};
};
