// Mock API functions for custom tasks

import {
	CustomTask,
	CustomTaskStatus,
	ApiResponse,
	PaginatedResponse,
} from '@/src/core/types';
import { mockDelay, generateId } from '../utils/helpers';

/**
 * Get all open custom tasks
 */
export const mockGetOpenTasks = async (
	page: number = 1,
	pageSize: number = 20,
): Promise<ApiResponse<PaginatedResponse<CustomTask>>> => {
	await mockDelay(700);

	// Return empty list for now - tasks will be added by users
	return {
		success: true,
		data: {
			data: [],
			total: 0,
			page,
			pageSize,
			hasMore: false,
		},
	};
};

/**
 * Get custom task by ID
 */
export const mockGetCustomTask = async (
	taskId: string,
): Promise<ApiResponse<CustomTask>> => {
	await mockDelay(500);

	return {
		success: false,
		error: 'Task not found',
	};
};

/**
 * Create a new custom task
 */
export const mockCreateCustomTask = async (
	taskData: Omit<
		CustomTask,
		'id' | 'status' | 'createdAt' | 'amountLocked' | 'paymentReleased'
	>,
): Promise<ApiResponse<CustomTask>> => {
	await mockDelay(1000);

	const task: CustomTask = {
		...taskData,
		id: generateId('custom_task'),
		status: 'open',
		createdAt: new Date(),
		amountLocked: true,
		paymentReleased: false,
	};

	return {
		success: true,
		data: task,
		message: 'Task created successfully',
	};
};

/**
 * Accept a custom task
 */
export const mockAcceptCustomTask = async (
	taskId: string,
	runnerId: string,
): Promise<ApiResponse<boolean>> => {
	await mockDelay(800);

	return {
		success: true,
		data: true,
		message: 'Task accepted successfully',
	};
};

/**
 * Update custom task status
 */
export const mockUpdateCustomTaskStatus = async (
	taskId: string,
	status: CustomTaskStatus,
): Promise<ApiResponse<boolean>> => {
	await mockDelay(600);

	return {
		success: true,
		data: true,
		message: `Task status updated to ${status}`,
	};
};

/**
 * Submit custom task for confirmation
 */
export const mockSubmitCustomTask = async (
	taskId: string,
): Promise<ApiResponse<boolean>> => {
	await mockDelay(700);

	return {
		success: true,
		data: true,
		message: 'Task submitted for confirmation',
	};
};

/**
 * Confirm custom task completion
 */
export const mockConfirmCustomTask = async (
	taskId: string,
): Promise<ApiResponse<boolean>> => {
	await mockDelay(800);

	return {
		success: true,
		data: true,
		message: 'Task confirmed and payment released',
	};
};

/**
 * Cancel custom task
 */
export const mockCancelCustomTask = async (
	taskId: string,
): Promise<ApiResponse<boolean>> => {
	await mockDelay(600);

	return {
		success: true,
		data: true,
		message: 'Task cancelled and funds refunded',
	};
};

/**
 * Get user's custom tasks
 */
export const mockGetUserCustomTasks = async (
	userId: string,
): Promise<ApiResponse<CustomTask[]>> => {
	await mockDelay(600);

	return {
		success: true,
		data: [],
	};
};

/**
 * Get runner's custom tasks
 */
export const mockGetRunnerCustomTasks = async (
	runnerId: string,
): Promise<ApiResponse<CustomTask[]>> => {
	await mockDelay(600);

	return {
		success: true,
		data: [],
	};
};
