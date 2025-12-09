import { useEffect, useState } from 'react';
import * as ExpoLocation from 'expo-location';
import type { ErrandLocation, SavedAddress } from '@/src/core/types';

export const useLocation = () => {
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const [hasPermission, setHasPermission] = useState(false);

	useEffect(() => {
		checkPermission();
	}, []);

	const checkPermission = async () => {
		const { status } = await ExpoLocation.getForegroundPermissionsAsync();
		setHasPermission(status === 'granted');
	};

	const requestPermission = async (): Promise<boolean> => {
		const { status } =
			await ExpoLocation.requestForegroundPermissionsAsync();
		const granted = status === 'granted';
		setHasPermission(granted);
		return granted;
	};

	const getCurrentLocation = async (): Promise<ErrandLocation | null> => {
		try {
			setLoading(true);
			setError(null);

			if (!hasPermission) {
				const granted = await requestPermission();
				if (!granted) {
					setError('Location permission denied');
					return null;
				}
			}

			const location = await ExpoLocation.getCurrentPositionAsync({
				accuracy: ExpoLocation.Accuracy.Balanced,
			});

			// Reverse geocode to get address
			const [addressResult] = await ExpoLocation.reverseGeocodeAsync({
				latitude: location.coords.latitude,
				longitude: location.coords.longitude,
			});

			const errandLocation: ErrandLocation = {
				latitude: location.coords.latitude,
				longitude: location.coords.longitude,
				address:
					`${addressResult.street || ''}, ${addressResult.name || ''}`.trim(),
				city: addressResult.city || 'Unknown',
			};

			return errandLocation;
		} catch (err) {
			const message =
				err instanceof Error ? err.message : 'Failed to get location';
			setError(message);
			return null;
		} finally {
			setLoading(false);
		}
	};

	const geocodeAddress = async (
		address: string,
	): Promise<ErrandLocation | null> => {
		try {
			setLoading(true);
			setError(null);

			const results = await ExpoLocation.geocodeAsync(address);

			if (results.length === 0) {
				setError('Address not found');
				return null;
			}

			const result = results[0];

			const errandLocation: ErrandLocation = {
				latitude: result.latitude,
				longitude: result.longitude,
				address: address,
				city: 'Umuahia', // Default city, could be enhanced
			};

			return errandLocation;
		} catch (err) {
			const message =
				err instanceof Error
					? err.message
					: 'Failed to geocode address';
			setError(message);
			return null;
		} finally {
			setLoading(false);
		}
	};

	const calculateDistance = (
		from: ErrandLocation,
		to: ErrandLocation,
	): number => {
		// Haversine formula to calculate distance between two points
		const R = 6371; // Earth's radius in km
		const dLat = toRad(to.latitude - from.latitude);
		const dLon = toRad(to.longitude - from.longitude);

		const lat1 = toRad(from.latitude);
		const lat2 = toRad(to.latitude);

		const a =
			Math.sin(dLat / 2) * Math.sin(dLat / 2) +
			Math.sin(dLon / 2) *
				Math.sin(dLon / 2) *
				Math.cos(lat1) *
				Math.cos(lat2);
		const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
		const distance = R * c;

		return distance;
	};

	const toRad = (value: number): number => {
		return (value * Math.PI) / 180;
	};

	return {
		loading,
		error,
		hasPermission,
		getCurrentLocation,
		geocodeAddress,
		calculateDistance,
		requestPermission,
	};
};

// Mock saved addresses for demo purposes
export const useSavedAddresses = () => {
	const [addresses] = useState<SavedAddress[]>([
		{
			id: '1',
			userId: 'user-1',
			latitude: 5.5333,
			longitude: 7.4833,
			address: '123 Aba Road',
			city: 'Umuahia',
			label: 'Home',
			isDefault: true,
		},
		{
			id: '2',
			userId: 'user-1',
			latitude: 5.525,
			longitude: 7.49,
			address: '45 Ikot Ekpene Road',
			city: 'Umuahia',
			label: 'Work',
			isDefault: false,
		},
	]);

	return { addresses };
};
