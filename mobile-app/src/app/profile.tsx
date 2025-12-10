import React from 'react';
import { Alert, Pressable, Text, View } from 'react-native';
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

export default function ProfileScreen() {
	const colorScheme = useColorScheme();
	const colors = Colors[colorScheme ?? 'light'];
	const router = useRouter();
	const { user, logout, updateRunnerStatus } = useAuthStore();

	// Default to 'not_applied' if runnerStatus is undefined (for old users)
	const runnerStatus = user?.runnerStatus ?? 'not_applied';

	const handleLogout = () => {
		Alert.alert('Logout', 'Are you sure you want to logout?', [
			{
				text: 'Cancel',
				style: 'cancel',
			},
			{
				text: 'Logout',
				style: 'destructive',
				onPress: () => {
					logout();
					router.replace('/');
				},
			},
		]);
	};

	return (
		<SafeAreaView spaced scrollable>
			{/* Header */}
			<Pressable
				onPress={() => {
					// If user hasn't completed KYC, navigate to KYC screen
					if (!user?.kycCompleted) {
						router.push('/kyc');
					}
				}}
				className="mt-8 mb-6 items-center"
			>
				<View
					className="w-24 h-24 rounded-full items-center justify-center mb-4"
					style={{ backgroundColor: colors.primary + '20' }}
				>
					<Text className="text-4xl">
						{user?.name ? user.name.charAt(0).toUpperCase() : '👤'}
					</Text>
				</View>
				<Title>{user?.name || 'Guest User'}</Title>
				<Subtitle color={colors.textSecondary} className="mt-1">
					{user?.email || 'No email'}
				</Subtitle>

				{/* KYC Indicator */}
				<View className="mt-3">
					<View
						className="px-3 py-1 rounded-full"
						style={{
							backgroundColor: user?.kycCompleted
								? colors.success
								: colors.warning,
						}}
					>
						<Text
							className="text-sm font-semibold"
							style={{ color: '#fff' }}
						>
							{user?.kycCompleted
								? 'KYC Complete'
								: 'KYC Pending'}
						</Text>
					</View>
				</View>
			</Pressable>

			{/* Profile Details */}
			<Section>
				<Text
					className="text-lg font-bold mb-4"
					style={{ color: colors.text }}
				>
					Profile Information
				</Text>

				<View
					className="rounded-2xl p-4 mb-4"
					style={{
						backgroundColor: colors.card,
						borderColor: colors.border,
					}}
				>
					<ProfileRow
						label="Name"
						value={user?.name || 'N/A'}
						colors={colors}
					/>
					<ProfileRow
						label="Email"
						value={user?.email || 'N/A'}
						colors={colors}
					/>
					<ProfileRow
						label="Phone"
						value={user?.phone || 'N/A'}
						colors={colors}
					/>
					<ProfileRow
						label="Member Since"
						value={
							user?.createdAt
								? new Date(user.createdAt).toLocaleDateString()
								: 'N/A'
						}
						colors={colors}
						isLast
					/>
				</View>
			</Section>

			{/* Runner Status Section */}
			<Section>
				<Text
					className="text-lg font-bold mb-4"
					style={{ color: colors.text }}
				>
					Runner Status
				</Text>

				<Pressable
					onPress={() => {
						updateRunnerStatus('approved');
					}}
				>
					<Text>*</Text>
				</Pressable>
				<View
					className="rounded-2xl p-4 mb-4"
					style={{ backgroundColor: colors.card }}
				>
					<View className="flex-row justify-between items-center mb-3">
						<Text
							className="text-base"
							style={{ color: colors.text }}
						>
							Status
						</Text>
						<View
							className="px-3 py-1 rounded-full"
							style={{
								backgroundColor:
									runnerStatus === 'approved'
										? colors.success
										: runnerStatus === 'pending'
											? colors.warning
											: runnerStatus === 'rejected'
												? colors.error
												: colors.textSecondary,
							}}
						>
							<Text
								className="text-sm font-semibold"
								style={{ color: '#fff' }}
							>
								{runnerStatus === 'approved'
									? '✓ Approved Runner'
									: runnerStatus === 'pending'
										? '⏳ Application Pending'
										: runnerStatus === 'rejected'
											? '✕ Application Rejected'
											: 'Not a Runner'}
							</Text>
						</View>
					</View>

					{runnerStatus === 'approved' && user?.runnerProfile && (
						<>
							<View className="flex-row justify-between items-center mb-3">
								<Text
									className="text-base"
									style={{ color: colors.textSecondary }}
								>
									Rating
								</Text>
								<Text
									className="text-base font-bold"
									style={{ color: colors.primary }}
								>
									⭐ {user.runnerProfile.rating.toFixed(1)}
								</Text>
							</View>

							<View className="flex-row justify-between items-center">
								<Text
									className="text-base"
									style={{ color: colors.textSecondary }}
								>
									Total Deliveries
								</Text>
								<Text
									className="text-base font-bold"
									style={{ color: colors.text }}
								>
									{user.runnerProfile.totalDeliveries}
								</Text>
							</View>
						</>
					)}

					{runnerStatus === 'pending' && (
						<Text
							className="text-sm mt-2"
							style={{ color: colors.textSecondary }}
						>
							Your application is being reviewed. We'll notify you
							within 2-3 business days.
						</Text>
					)}

					{runnerStatus === 'rejected' &&
						user?.runnerApplication?.rejectionReason && (
							<Text
								className="text-sm mt-2"
								style={{ color: colors.error }}
							>
								Reason: {user.runnerApplication.rejectionReason}
							</Text>
						)}
				</View>

				{/* Action Buttons based on runner status */}
				{runnerStatus === 'not_applied' && (
					<Button
						title="Apply to Become a Runner"
						onPress={() => router.push('/runner-application')}
						fullWidth
						size="large"
						icon={<Text>🏃</Text>}
					/>
				)}

				{runnerStatus === 'approved' && (
					<Button
						title="Open Runner Dashboard"
						onPress={() => router.push('/(runner)/dashboard')}
						fullWidth
						size="large"
						icon={<Text>📊</Text>}
					/>
				)}

				{runnerStatus === 'rejected' && (
					<Button
						title="Reapply as Runner"
						onPress={() => router.push('/runner-application')}
						variant="outline"
						fullWidth
						size="large"
					/>
				)}
			</Section>

			{/* Stats Section */}
			<Section>
				<Text
					className="text-lg font-bold mb-4"
					style={{ color: colors.text }}
				>
					Activity
				</Text>

				<View className="flex-row gap-3">
					<View
						className="flex-1 rounded-2xl p-4 items-center"
						style={{ backgroundColor: colors.card }}
					>
						<Text
							className="text-3xl font-bold"
							style={{ color: colors.primary }}
						>
							0
						</Text>
						<Text
							className="text-sm mt-1"
							style={{ color: colors.textSecondary }}
						>
							Total Errands
						</Text>
					</View>

					<View
						className="flex-1 rounded-2xl p-4 items-center"
						style={{ backgroundColor: colors.card }}
					>
						<Text
							className="text-3xl font-bold"
							style={{ color: colors.primary }}
						>
							0
						</Text>
						<Text
							className="text-sm mt-1"
							style={{ color: colors.textSecondary }}
						>
							Completed
						</Text>
					</View>
				</View>
			</Section>

			{/* Logout Button */}
			<View className="mt-8">
				<Button
					title="Logout"
					onPress={handleLogout}
					fullWidth
					variant="outline"
					size="large"
				/>
			</View>
		</SafeAreaView>
	);
}

interface ProfileRowProps {
	label: string;
	value: string;
	colors: any;
	isLast?: boolean;
}

const ProfileRow: React.FC<ProfileRowProps> = ({
	label,
	value,
	colors,
	isLast,
}) => {
	return (
		<View
			className={`flex-row justify-between py-3 ${!isLast ? 'border-b' : ''}`}
			style={{ borderColor: colors.border }}
		>
			<Text className="text-base" style={{ color: colors.textSecondary }}>
				{label}
			</Text>
			<Text
				className="text-base font-semibold"
				style={{ color: colors.text }}
			>
				{value}
			</Text>
		</View>
	);
};
