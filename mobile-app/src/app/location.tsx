import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import {
	SafeAreaView,
	LocationInput,
	Button,
	Title,
	Subtitle,
	Section,
} from '@/src/components/ui';
import {
	Colors,
	Spacing,
	FontSizes,
	FontWeights,
	Radius,
} from '@/src/core/constants/theme';
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
			router.push('/(screens)/errand/task-details');
		}
	};

	const taskTitle = taskType
		? taskType.replace(/_/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase())
		: 'Errand';

	return (
		<SafeAreaView
			style={[styles.container, { backgroundColor: colors.background }]}
		>
			<ScrollView
				style={styles.scrollView}
				contentContainerStyle={styles.scrollContent}
				showsVerticalScrollIndicator={false}
			>
				{/* Header */}
				<View style={styles.header}>
					<Title>{taskTitle}</Title>
					<Subtitle color={colors.textSecondary} style={styles.subtitle}>
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
						<Text style={[styles.sectionTitle, { color: colors.text }]}>
							Saved Addresses
						</Text>
						{addresses.map((address) => (
							<TouchableOpacity
								key={address.id}
								style={[
									styles.addressCard,
									{
										backgroundColor: colors.card,
										borderColor: colors.border,
									},
								]}
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
								<View style={styles.addressHeader}>
									<Text style={[styles.addressLabel, { color: colors.primary }]}>
										{address.label}
									</Text>
									{address.isDefault && (
										<View
											style={[
												styles.defaultBadge,
												{ backgroundColor: colors.primary + '20' },
											]}
										>
											<Text
												style={[
													styles.defaultText,
													{ color: colors.primary },
												]}
											>
												Default
											</Text>
										</View>
									)}
								</View>
								<Text style={[styles.addressText, { color: colors.text }]}>
									{address.address}
								</Text>
								<Text
									style={[styles.addressCity, { color: colors.textSecondary }]}
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
					style={[
						styles.infoBox,
						{
							backgroundColor: colors.primary + '10',
							borderColor: colors.primary + '30',
						},
					]}
				>
					<Text style={styles.infoIcon}>💡</Text>
					<Text style={[styles.infoText, { color: colors.text }]}>
						Make sure both locations are accurate for best service
					</Text>
				</View>
			</ScrollView>

			{/* Bottom Button */}
			<View
				style={[
					styles.bottomContainer,
					{
						backgroundColor: colors.background,
						borderTopColor: colors.border,
					},
				]}
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

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	scrollView: {
		flex: 1,
	},
	scrollContent: {
		paddingHorizontal: Spacing.lg,
		paddingTop: Spacing.lg,
		paddingBottom: Spacing.xl * 2,
	},
	header: {
		marginBottom: Spacing.xl,
	},
	subtitle: {
		fontSize: FontSizes.md,
		lineHeight: 22,
		marginTop: Spacing.sm,
	},
	sectionTitle: {
		fontSize: FontSizes.md,
		fontWeight: FontWeights.semibold,
		marginBottom: Spacing.sm,
	},
	addressCard: {
		padding: Spacing.md,
		borderRadius: Radius.md,
		borderWidth: 1,
		marginBottom: Spacing.sm,
	},
	addressHeader: {
		flexDirection: 'row',
		alignItems: 'center',
		marginBottom: Spacing.xs,
	},
	addressLabel: {
		fontSize: FontSizes.md,
		fontWeight: FontWeights.semibold,
		marginRight: Spacing.sm,
	},
	defaultBadge: {
		paddingHorizontal: Spacing.sm,
		paddingVertical: 2,
		borderRadius: Radius.sm,
	},
	defaultText: {
		fontSize: FontSizes.xs,
		fontWeight: FontWeights.medium,
	},
	addressText: {
		fontSize: FontSizes.sm,
		marginBottom: 2,
	},
	addressCity: {
		fontSize: FontSizes.xs,
	},
	infoBox: {
		flexDirection: 'row',
		padding: Spacing.md,
		borderRadius: Radius.md,
		borderWidth: 1,
		alignItems: 'center',
	},
	infoIcon: {
		fontSize: 20,
		marginRight: Spacing.sm,
	},
	infoText: {
		flex: 1,
		fontSize: FontSizes.sm,
		lineHeight: 20,
	},
	bottomContainer: {
		padding: Spacing.lg,
		borderTopWidth: 1,
	},
});
