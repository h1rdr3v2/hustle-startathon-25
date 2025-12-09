// Utilities for mock APIs and calculations

import {
	Location,
	FareConfig,
	FareCalculationResult,
	Runner,
} from '@/src/core/types';

/**
 * Simulates network delay for mock API calls
 */
export const mockDelay = (ms: number = 800): Promise<void> => {
	return new Promise((resolve) => setTimeout(resolve, ms));
};

/**
 * Calculate distance between two coordinates using Haversine formula
 * Returns distance in kilometers
 */
export const calculateDistance = (loc1: Location, loc2: Location): number => {
	const R = 6371; // Radius of Earth in kilometers
	const dLat = toRad(loc2.latitude - loc1.latitude);
	const dLon = toRad(loc2.longitude - loc1.longitude);

	const a =
		Math.sin(dLat / 2) * Math.sin(dLat / 2) +
		Math.cos(toRad(loc1.latitude)) *
			Math.cos(toRad(loc2.latitude)) *
			Math.sin(dLon / 2) *
			Math.sin(dLon / 2);

	const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
	const distance = R * c;

	return Number(distance.toFixed(2));
};

const toRad = (degrees: number): number => {
	return (degrees * Math.PI) / 180;
};

/**
 * Fare configuration for Ridely
 */
export const fareConfig: FareConfig = {
	flatRate: 500, // Base fare for deliveries within base distance
	perKmRate: 150, // Additional charge per kilometer beyond base distance
	baseDistance: 2, // Base distance in km covered by flat rate
	minimumFare: 500, // Minimum delivery fare
};

/**
 * Calculate delivery fare based on distance
 */
export const calculateFare = (distance: number): FareCalculationResult => {
	let baseFare = fareConfig.flatRate;
	let distanceFare = 0;

	if (distance > fareConfig.baseDistance) {
		const extraDistance = distance - fareConfig.baseDistance;
		distanceFare = Math.ceil(extraDistance) * fareConfig.perKmRate;
	}

	const totalFare = Math.max(baseFare + distanceFare, fareConfig.minimumFare);

	return {
		distance,
		baseFare,
		distanceFare,
		totalFare,
	};
};

/**
 * Find the nearest available runner to a location
 */
export const findNearestRunner = (
	targetLocation: Location,
	availableRunners: Runner[],
): Runner | null => {
	if (availableRunners.length === 0) return null;

	let nearestRunner = availableRunners[0];
	let shortestDistance = calculateDistance(
		targetLocation,
		nearestRunner.currentLocation,
	);

	for (let i = 1; i < availableRunners.length; i++) {
		const runner = availableRunners[i];
		const distance = calculateDistance(
			targetLocation,
			runner.currentLocation,
		);

		if (distance < shortestDistance) {
			shortestDistance = distance;
			nearestRunner = runner;
		}
	}

	return nearestRunner;
};

/**
 * Generate a unique ID
 */
export const generateId = (prefix: string = 'id'): string => {
	return `${prefix}_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
};

/**
 * Format currency in Naira
 */
export const formatCurrency = (amount: number): string => {
	return `₦${amount.toLocaleString('en-NG')}`;
};

/**
 * Format date to readable string
 */
export const formatDate = (date: Date): string => {
	return new Intl.DateTimeFormat('en-NG', {
		year: 'numeric',
		month: 'short',
		day: 'numeric',
		hour: '2-digit',
		minute: '2-digit',
	}).format(date);
};

/**
 * Calculate estimated delivery time based on distance
 * Returns time in minutes
 */
export const estimateDeliveryTime = (distance: number): number => {
	// Assume average speed of 20 km/h in the city
	const travelTimeMinutes = (distance / 20) * 60;

	// Add 10 minutes for pickup and handling
	const pickupTime = 10;

	return Math.ceil(travelTimeMinutes + pickupTime);
};

/**
 * Validate phone number (Nigerian format)
 */
export const validatePhoneNumber = (phone: string): boolean => {
	const phoneRegex = /^(\+234|0)[789][01]\d{8}$/;
	return phoneRegex.test(phone);
};

/**
 * Validate email
 */
export const validateEmail = (email: string): boolean => {
	const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	return emailRegex.test(email);
};
