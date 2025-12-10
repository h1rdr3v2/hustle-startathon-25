// Mock API functions for authentication

import {
	ApiResponse,
	LoginCredentials,
	OTPVerification,
	SignupData,
	User,
} from '@/src/core/types';
import { generateId, mockDelay } from '../utils/helpers';

/**
 * Mock login function
 * Accepts any email/password combination for testing
 */
export const mockLogin = async (
	credentials: LoginCredentials,
): Promise<ApiResponse<{ user: User; token: string }>> => {
	await mockDelay(1000);

	// For demo purposes, accept any login
	if (credentials.email && credentials.password) {
		const user: User = {
			id: generateId('user'),
			name: 'Demo User',
			email: credentials.email,
			phone: '08012345678',
			role: 'user',
			runnerStatus: 'not_applied',
			location: {
				latitude: 5.5256,
				longitude: 7.4905,
				address: 'Umuahia, Abia State',
				city: 'Umuahia',
			},
			createdAt: new Date(),
		};

		return {
			success: true,
			data: {
				user,
				token: `mock_token_${Date.now()}`,
			},
			message: 'Login successful',
		};
	}

	return {
		success: false,
		error: 'Invalid credentials',
	};
};

/**
 * Mock signup function
 */
export const mockSignup = async (
	data: SignupData,
): Promise<ApiResponse<{ user: User; token: string }>> => {
	await mockDelay(1200);

	const user: User = {
		id: generateId('user'),
		name: data.name,
		email: data.email,
		phone: data.phone,
		role: data.role,
		runnerStatus: 'not_applied',
		location: {
			latitude: 5.5256,
			longitude: 7.4905,
			address: 'Umuahia, Abia State',
			city: 'Umuahia',
		},
		createdAt: new Date(),
	};

	return {
		success: true,
		data: {
			user,
			token: `mock_token_${Date.now()}`,
		},
		message: 'Account created successfully',
	};
};

/**
 * Mock OTP verification
 */
export const mockVerifyOTP = async (
	verification: OTPVerification,
): Promise<ApiResponse<boolean>> => {
	await mockDelay(800);

	// Accept any 6-digit code for testing
	if (verification.code.length === 6) {
		return {
			success: true,
			data: true,
			message: 'OTP verified successfully',
		};
	}

	return {
		success: false,
		error: 'Invalid OTP code',
	};
};

/**
 * Mock send OTP function
 */
export const mockSendOTP = async (
	phone: string,
): Promise<ApiResponse<boolean>> => {
	await mockDelay(800);

	return {
		success: true,
		data: true,
		message: `OTP sent to ${phone}`,
	};
};

/**
 * Mock logout function
 */
export const mockLogout = async (): Promise<ApiResponse<boolean>> => {
	await mockDelay(500);

	return {
		success: true,
		data: true,
		message: 'Logged out successfully',
	};
};
