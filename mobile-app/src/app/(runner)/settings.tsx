import React from 'react';
import { Alert, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { useRouter } from 'expo-router';
import {
	Button,
	SafeAreaView,
	Section,
	Subtitle,
	Title,
} from '@/src/components/ui';
import { Colors } from '@/src/core/constants/theme';
import { useColorScheme } from '@/src/core/hooks/use-color-scheme';
import { useAuthStore } from '@/src/core/stores/authStore';

export default function RunnerSettingsScreen() {
	const colorScheme = useColorScheme();
	const colors = Colors[colorScheme ?? 'light'];
	const router = useRouter();
	const { user } = useAuthStore();

	const runnerProfile = user?.runnerProfile;
	const runnerApplication = user?.runnerApplication;

	const handleUpdateVehicle = () => {
		Alert.alert(
			'Coming Soon',
			'Vehicle update feature will be available soon',
		);
	};

	const handleUpdateAvailability = () => {
		Alert.alert(
			'Coming Soon',
			'Availability schedule update feature will be available soon',
		);
	};

	const handleViewDocuments = () => {
		Alert.alert(
			'Coming Soon',
			'Document management feature will be available soon',
		);
	};

	const handleDeactivateRunner = () => {
		Alert.alert(
			'Deactivate Runner Account',
			'Are you sure you want to deactivate your runner account? You can reapply later.',
			[
				{ text: 'Cancel', style: 'cancel' },
				{
					text: 'Deactivate',
					style: 'destructive',
					onPress: () => {
						// TODO: Implement deactivation
						console.log('Deactivate runner account');
					},
				},
			],
		);
	};

	return (
		<SafeAreaView scrollable spaced>
			{/* Header */}
			<View className="mb-6 flex-row justify-between items-center">
				<View className="flex-1">
					<Title>Runner Settings</Title>
					<Subtitle color={colors.textSecondary}>
						Manage your runner profile
					</Subtitle>
				</View>

				<TouchableOpacity
					onPress={() => router.back()}
					className="w-10 h-10 rounded-full items-center justify-center"
					style={{ backgroundColor: colors.card }}
				>
					<Text style={{ color: colors.text, fontSize: 20 }}>✕</Text>
				</TouchableOpacity>
			</View>

			{/* Runner Status */}
			<Section>
				<Text
					className="text-lg font-bold mb-4"
					style={{ color: colors.text }}
				>
					Runner Status
				</Text>

				<View
					className="rounded-2xl p-4"
					style={{ backgroundColor: colors.card }}
				>
					<View className="flex-row justify-between items-center mb-3">
						<Text
							className="text-base"
							style={{ color: colors.text }}
						>
							Status
						</Text>
						<Text
							className="text-base font-bold px-3 py-1 rounded-full"
							style={{
								backgroundColor: colors.success + '20',
								color: colors.success,
							}}
						>
							Active
						</Text>
					</View>

					<View className="flex-row justify-between items-center mb-3">
						<Text
							className="text-base"
							style={{ color: colors.text }}
						>
							Member Since
						</Text>
						<Text
							className="text-base font-semibold"
							style={{ color: colors.text }}
						>
							{runnerProfile?.joinedAsRunnerAt
								? new Date(
										runnerProfile.joinedAsRunnerAt,
									).toLocaleDateString()
								: 'N/A'}
						</Text>
					</View>

					<View className="flex-row justify-between items-center">
						<Text
							className="text-base"
							style={{ color: colors.text }}
						>
							Rating
						</Text>
						<Text
							className="text-base font-semibold"
							style={{ color: colors.primary }}
						>
							⭐ {runnerProfile?.rating.toFixed(1) || '0.0'}
						</Text>
					</View>
				</View>
			</Section>

			{/* Vehicle Information */}
			<Section>
				<Text
					className="text-lg font-bold mb-4"
					style={{ color: colors.text }}
				>
					Vehicle Information
				</Text>

				<View
					className="rounded-2xl p-4 mb-4"
					style={{ backgroundColor: colors.card }}
				>
					<View className="flex-row justify-between items-center mb-3">
						<Text
							className="text-base"
							style={{ color: colors.text }}
						>
							Vehicle Type
						</Text>
						<Text
							className="text-base font-semibold capitalize"
							style={{ color: colors.text }}
						>
							{runnerApplication?.vehicleType?.replace(
								'_',
								' ',
							) || 'N/A'}
						</Text>
					</View>

					{runnerApplication?.vehicleType !== 'on_foot' && (
						<>
							<View className="flex-row justify-between items-center mb-3">
								<Text
									className="text-base"
									style={{ color: colors.text }}
								>
									Make & Model
								</Text>
								<Text
									className="text-base font-semibold"
									style={{ color: colors.text }}
								>
									{runnerApplication?.vehicleMake}{' '}
									{runnerApplication?.vehicleModel}
								</Text>
							</View>

							<View className="flex-row justify-between items-center">
								<Text
									className="text-base"
									style={{ color: colors.text }}
								>
									Plate Number
								</Text>
								<Text
									className="text-base font-semibold"
									style={{ color: colors.text }}
								>
									{runnerApplication?.vehiclePlateNumber ||
										'N/A'}
								</Text>
							</View>
						</>
					)}
				</View>

				<Button
					title="Update Vehicle"
					onPress={handleUpdateVehicle}
					variant="outline"
					fullWidth
				/>
			</Section>

			{/* Availability */}
			<Section>
				<Text
					className="text-lg font-bold mb-4"
					style={{ color: colors.text }}
				>
					Availability
				</Text>

				<View
					className="rounded-2xl p-4 mb-4"
					style={{ backgroundColor: colors.card }}
				>
					<View className="mb-3">
						<Text
							className="text-base font-semibold mb-2"
							style={{ color: colors.text }}
						>
							Available Days
						</Text>
						<Text
							className="text-sm"
							style={{ color: colors.textSecondary }}
						>
							{runnerApplication?.availableDays?.join(', ') ||
								'Not set'}
						</Text>
					</View>

					<View>
						<Text
							className="text-base font-semibold mb-2"
							style={{ color: colors.text }}
						>
							Available Hours
						</Text>
						<Text
							className="text-sm"
							style={{ color: colors.textSecondary }}
						>
							{runnerApplication?.availableHours || 'Not set'}
						</Text>
					</View>
				</View>

				<Button
					title="Update Availability"
					onPress={handleUpdateAvailability}
					variant="outline"
					fullWidth
				/>
			</Section>

			{/* Documents */}
			<Section>
				<Text
					className="text-lg font-bold mb-4"
					style={{ color: colors.text }}
				>
					Documents
				</Text>

				<View
					className="rounded-2xl p-4 mb-4"
					style={{ backgroundColor: colors.card }}
				>
					<View className="flex-row justify-between items-center mb-3">
						<Text
							className="text-base"
							style={{ color: colors.text }}
						>
							Driver's License
						</Text>
						<Text
							className="text-sm px-2 py-1 rounded-full"
							style={{
								backgroundColor:
									runnerApplication?.hasDriversLicense
										? colors.success + '20'
										: colors.warning + '20',
								color: runnerApplication?.hasDriversLicense
									? colors.success
									: colors.warning,
							}}
						>
							{runnerApplication?.hasDriversLicense
								? '✓ Verified'
								: 'Not provided'}
						</Text>
					</View>

					{runnerApplication?.vehicleType !== 'on_foot' && (
						<View className="flex-row justify-between items-center">
							<Text
								className="text-base"
								style={{ color: colors.text }}
							>
								Vehicle Registration
							</Text>
							<Text
								className="text-sm px-2 py-1 rounded-full"
								style={{
									backgroundColor:
										runnerApplication?.hasVehicleRegistration
											? colors.success + '20'
											: colors.warning + '20',
									color: runnerApplication?.hasVehicleRegistration
										? colors.success
										: colors.warning,
								}}
							>
								{runnerApplication?.hasVehicleRegistration
									? '✓ Verified'
									: 'Not provided'}
							</Text>
						</View>
					)}
				</View>

				<Button
					title="Manage Documents"
					onPress={handleViewDocuments}
					variant="outline"
					fullWidth
				/>
			</Section>

			{/* Danger Zone */}
			<Section>
				<Text
					className="text-lg font-bold mb-4"
					style={{ color: colors.error }}
				>
					Danger Zone
				</Text>

				<Button
					title="Deactivate Runner Account"
					onPress={handleDeactivateRunner}
					variant="danger"
					fullWidth
				/>
			</Section>

			<View className="h-8" />
		</SafeAreaView>
	);
}
