import React, { useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { useRouter } from 'expo-router';
import {
	Button,
	LocationInput,
	SafeAreaView,
	Section,
	Subtitle,
	Title,
} from '@/src/components/ui';
import { Colors } from '@/src/core/constants/theme';
import { useColorScheme } from '@/src/core/hooks/use-color-scheme';
import { useLocation, useSavedAddresses } from '@/src/core/hooks/useLocation';
import { useErrandFlowStore } from '@/src/core/stores/errandFlowStore';
import type { ErrandLocation } from '@/src/core/types';

export default function LocationConfirmationScreen() {
	const colorScheme = useColorScheme();
	const colors = Colors[colorScheme ?? 'light'];
	const router = useRouter();

	const {
		taskType,
		pickupLocation,
		deliveryLocation,
		setPickupLocation,
		setDeliveryLocation,
		setCurrentStep,
	} = useErrandFlowStore();

	const {
		loading: locationLoading,
		error: locationError,
		getCurrentLocation,
	} = useLocation();

	const { addresses } = useSavedAddresses();

	const [pickupError, setPickupError] = useState<string | null>(null);
	const [deliveryError, setDeliveryError] = useState<string | null>(null);

	const handleDetectPickup = async () => {
		const location = await getCurrentLocation();
		if (location) {
			setPickupLocation(location);
			setPickupError(null);
		}
	};

	const handleDetectDelivery = async () => {
		const location = await getCurrentLocation();
		if (location) {
			setDeliveryLocation(location);
			setDeliveryError(null);
		}
	};

	const handleContinue = () => {
		let hasError = false;

		if (!pickupLocation) {
			setPickupError('Please select a pickup location');
			hasError = true;
		}

		if (!deliveryLocation) {
			setDeliveryError('Please select a delivery location');
			hasError = true;
		}

		if (!hasError) {
			setCurrentStep('task_details');
			router.push('/task-details');
		}
	};

	const taskTitle = taskType
		? taskType.replace(/_/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase())
		: 'Errand';

	return (
		<SafeAreaView spaced scrollable>
			{/* Header */}
			<View className="mb-8">
				<Title>{taskTitle}</Title>
				<Subtitle
					color={colors.textSecondary}
					className="text-base leading-6 mt-2"
				>
					Where should we pick up and deliver?
				</Subtitle>
			</View>

			{/* Pickup Location */}
			<Section>
				<LocationInput
					label="Pickup Location"
					location={pickupLocation}
					onPress={() => {
						// Navigate to location picker
						// For now, we'll use saved addresses
					}}
					onDetectLocation={handleDetectPickup}
					loading={locationLoading}
					error={pickupError || locationError || undefined}
				/>
			</Section>

			{/* Saved Addresses */}
			{addresses.length > 0 && (
				<Section spacing="md">
					<Text
						className="text-base font-semibold mb-2"
						style={{ color: colors.text }}
					>
						Saved Addresses
					</Text>
					{addresses.map((address) => (
						<TouchableOpacity
							key={address.id}
							className="p-4 rounded-2xl border mb-2"
							style={{
								backgroundColor: colors.card,
								borderColor: colors.border,
							}}
							onPress={() => {
								if (!pickupLocation) {
									setPickupLocation(address);
									setPickupError(null);
								} else {
									setDeliveryLocation(address);
									setDeliveryError(null);
								}
							}}
						>
							<View className="flex-row items-center mb-1">
								<Text
									className="text-base font-semibold mr-2"
									style={{ color: colors.primary }}
								>
									{address.label}
								</Text>
								{address.isDefault && (
									<View
										className="px-2 py-0.5 rounded"
										style={{
											backgroundColor:
												colors.primary + '20',
										}}
									>
										<Text
											className="text-xs font-medium"
											style={{ color: colors.primary }}
										>
											Default
										</Text>
									</View>
								)}
							</View>
							<Text
								className="text-sm mb-0.5"
								style={{ color: colors.text }}
							>
								{address.address}
							</Text>
							<Text
								className="text-xs"
								style={{ color: colors.textSecondary }}
							>
								{address.city}
							</Text>
						</TouchableOpacity>
					))}
				</Section>
			)}

			{/* Delivery Location */}
			<Section>
				<LocationInput
					label="Delivery Location"
					location={deliveryLocation}
					onPress={() => {
						// Navigate to location picker
					}}
					onDetectLocation={handleDetectDelivery}
					loading={locationLoading}
					error={deliveryError || locationError || undefined}
				/>
			</Section>

			{/* Info Box */}
			<View
				className="flex-row p-4 rounded-2xl border items-center"
				style={{
					backgroundColor: colors.primary + '10',
					borderColor: colors.primary + '30',
				}}
			>
				<Text className="text-xl mr-2">💡</Text>
				<Text
					className="flex-1 text-sm leading-5"
					style={{ color: colors.text }}
				>
					Make sure both locations are accurate for best service
				</Text>
			</View>

			{/* Bottom Button */}
			<View
				className="p-4 border-t mt-8"
				style={{
					backgroundColor: colors.background,
					borderTopColor: colors.border,
				}}
			>
				<Button
					title="Continue"
					onPress={handleContinue}
					fullWidth
					size="large"
					disabled={!pickupLocation || !deliveryLocation}
				/>
			</View>
		</SafeAreaView>
	);
}
