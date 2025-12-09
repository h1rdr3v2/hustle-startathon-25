// Mock API functions for instant tasks

import {
	InstantTask,
	PredefinedItem,
	Vendor,
	Location,
	ApiResponse,
	Runner,
} from '@/src/core/types';
import {
	mockDelay,
	generateId,
	calculateFare,
	findNearestRunner,
	calculateDistance,
} from '../utils/helpers';
import { mockPredefinedItems, mockVendors } from '../mock/mockData';

/**
 * Get all predefined items
 */
export const mockGetPredefinedItems = async (): Promise<
	ApiResponse<PredefinedItem[]>
> => {
	await mockDelay(600);

	return {
		success: true,
		data: mockPredefinedItems,
	};
};

/**
 * Get items by vendor
 */
export const mockGetItemsByVendor = async (
	vendorId: string,
): Promise<ApiResponse<PredefinedItem[]>> => {
	await mockDelay(500);

	const items = mockPredefinedItems.filter(
		(item) => item.vendorId === vendorId,
	);

	return {
		success: true,
		data: items,
	};
};

/**
 * Get items by category
 */
export const mockGetItemsByCategory = async (
	category: string,
): Promise<ApiResponse<PredefinedItem[]>> => {
	await mockDelay(500);

	const items = mockPredefinedItems.filter(
		(item) => item.category === category,
	);

	return {
		success: true,
		data: items,
	};
};

/**
 * Get all vendors
 */
export const mockGetVendors = async (): Promise<ApiResponse<Vendor[]>> => {
	await mockDelay(500);

	return {
		success: true,
		data: mockVendors,
	};
};

/**
 * Get vendor by ID
 */
export const mockGetVendor = async (
	vendorId: string,
): Promise<ApiResponse<Vendor>> => {
	await mockDelay(400);

	const vendor = mockVendors.find((v) => v.id === vendorId);

	if (!vendor) {
		return {
			success: false,
			error: 'Vendor not found',
		};
	}

	return {
		success: true,
		data: vendor,
	};
};

/**
 * Calculate fare for instant task
 */
export const mockCalculateInstantTaskFare = async (
	pickupLocation: Location,
	deliveryLocation: Location,
): Promise<
	ApiResponse<{
		itemPrice: number;
		deliveryFee: number;
		totalAmount: number;
		distance: number;
	}>
> => {
	await mockDelay(600);

	const distance = calculateDistance(pickupLocation, deliveryLocation);
	const fareResult = calculateFare(distance);

	return {
		success: true,
		data: {
			itemPrice: 0, // This will be set based on the item
			deliveryFee: fareResult.totalFare,
			totalAmount: fareResult.totalFare,
			distance: fareResult.distance,
		},
	};
};

/**
 * Create instant task and assign to nearest runner
 */
export const mockCreateInstantTask = async (
	taskData: Omit<
		InstantTask,
		'id' | 'status' | 'createdAt' | 'isPaid' | 'paymentReleased'
	>,
	availableRunners: Runner[],
): Promise<
	ApiResponse<{ task: InstantTask; assignedRunner: Runner | null }>
> => {
	await mockDelay(1000);

	// Find nearest runner
	const nearestRunner = findNearestRunner(
		taskData.pickupLocation,
		availableRunners,
	);

	if (!nearestRunner) {
		return {
			success: false,
			error: 'No available runners found',
		};
	}

	const taskId = (taskData as any).id || generateId('instant_task');

	const task: InstantTask = {
		...taskData,
		id: taskId,
		runnerId: nearestRunner.id,
		status: 'assigned',
		createdAt: new Date(),
		assignedAt: new Date(),
		isPaid: false,
		paymentReleased: false,
	};

	return {
		success: true,
		data: {
			task,
			assignedRunner: nearestRunner,
		},
		message: 'Task created and assigned successfully',
	};
};

/**
 * Update instant task status
 */
export const mockUpdateInstantTaskStatus = async (
	taskId: string,
	status: string,
): Promise<ApiResponse<boolean>> => {
	await mockDelay(500);

	return {
		success: true,
		data: true,
		message: `Task status updated to ${status}`,
	};
};

/**
 * Complete instant task and release payment
 */
export const mockCompleteInstantTask = async (
	taskId: string,
): Promise<ApiResponse<boolean>> => {
	await mockDelay(800);

	return {
		success: true,
		data: true,
		message: 'Task completed and payment released',
	};
};
