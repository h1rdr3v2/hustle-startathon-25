import React from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
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

export default function RunnerDashboardScreen() {
	const colorScheme = useColorScheme();
	const colors = Colors[colorScheme ?? 'light'];
	const router = useRouter();
	const { user, toggleRunnerAvailability } = useAuthStore();

	const runnerProfile = user?.runnerProfile;

	const toggleAvailability = () => {
		toggleRunnerAvailability();
	};

	return (
		<SafeAreaView spaced scrollable>
			{/* Header */}
			<View className="mb-6">
				<View className="flex-row justify-between items-center mb-2">
					<View className="flex-1">
						<Title>Runner Dashboard</Title>
						<Subtitle color={colors.textSecondary}>
							Welcome back, {user?.name}!
						</Subtitle>
					</View>

					<TouchableOpacity
						onPress={() => router.back()}
						className="w-10 h-10 rounded-full items-center justify-center"
						style={{ backgroundColor: colors.card }}
					>
						<Text style={{ color: colors.text, fontSize: 20 }}>
							✕
						</Text>
					</TouchableOpacity>
				</View>

				{/* Availability Toggle */}
				<View
					className="rounded-2xl p-4 mt-4"
					style={{
						backgroundColor: runnerProfile?.isAvailable
							? colors.success + '20'
							: colors.warning + '20',
					}}
				>
					<View className="flex-row justify-between items-center">
						<View className="flex-1">
							<Text
								className="text-lg font-bold"
								style={{
									color: runnerProfile?.isAvailable
										? colors.success
										: colors.warning,
								}}
							>
								{runnerProfile?.isAvailable
									? '🟢 You are Online'
									: '🔴 You are Offline'}
							</Text>
							<Text
								className="text-sm mt-1"
								style={{ color: colors.textSecondary }}
							>
								{runnerProfile?.isAvailable
									? 'Ready to accept new tasks'
									: 'Not accepting new tasks'}
							</Text>
						</View>
						<Button
							title={
								runnerProfile?.isAvailable
									? 'Go Offline'
									: 'Go Online'
							}
							onPress={toggleAvailability}
							variant={
								runnerProfile?.isAvailable
									? 'outline'
									: 'primary'
							}
							size="small"
						/>
					</View>
				</View>
			</View>

			{/* Stats Grid */}
			<Section>
				<Text
					className="text-lg font-bold mb-4"
					style={{ color: colors.text }}
				>
					Today's Stats
				</Text>

				<View className="flex-row gap-3 mb-3">
					<View
						className="flex-1 rounded-2xl p-4"
						style={{ backgroundColor: colors.card }}
					>
						<Text
							className="text-3xl font-bold"
							style={{ color: colors.primary }}
						>
							{runnerProfile?.activeTaskId ? '1' : '0'}
						</Text>
						<Text
							className="text-sm mt-1"
							style={{ color: colors.textSecondary }}
						>
							Active Tasks
						</Text>
					</View>

					<View
						className="flex-1 rounded-2xl p-4"
						style={{ backgroundColor: colors.card }}
					>
						<Text
							className="text-3xl font-bold"
							style={{ color: colors.success }}
						>
							0
						</Text>
						<Text
							className="text-sm mt-1"
							style={{ color: colors.textSecondary }}
						>
							Completed Today
						</Text>
					</View>
				</View>

				<View className="flex-row gap-3">
					<View
						className="flex-1 rounded-2xl p-4"
						style={{ backgroundColor: colors.card }}
					>
						<Text
							className="text-2xl font-bold"
							style={{ color: colors.text }}
						>
							₦0
						</Text>
						<Text
							className="text-sm mt-1"
							style={{ color: colors.textSecondary }}
						>
							Today's Earnings
						</Text>
					</View>

					<View
						className="flex-1 rounded-2xl p-4"
						style={{ backgroundColor: colors.card }}
					>
						<Text
							className="text-2xl font-bold"
							style={{ color: colors.primary }}
						>
							{runnerProfile?.rating.toFixed(1) || '0.0'}
						</Text>
						<Text
							className="text-sm mt-1"
							style={{ color: colors.textSecondary }}
						>
							Rating
						</Text>
					</View>
				</View>
			</Section>

			{/* Overall Performance */}
			<Section>
				<Text
					className="text-lg font-bold mb-4"
					style={{ color: colors.text }}
				>
					Overall Performance
				</Text>

				<View
					className="rounded-2xl p-4"
					style={{ backgroundColor: colors.card }}
				>
					<View className="flex-row justify-between py-3 border-b border-gray-200">
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
							{runnerProfile?.totalDeliveries || 0}
						</Text>
					</View>

					<View className="flex-row justify-between py-3 border-b border-gray-200">
						<Text
							className="text-base"
							style={{ color: colors.textSecondary }}
						>
							Completed
						</Text>
						<Text
							className="text-base font-bold"
							style={{ color: colors.success }}
						>
							{runnerProfile?.completedDeliveries || 0}
						</Text>
					</View>

					<View className="flex-row justify-between py-3 border-b border-gray-200">
						<Text
							className="text-base"
							style={{ color: colors.textSecondary }}
						>
							Acceptance Rate
						</Text>
						<Text
							className="text-base font-bold"
							style={{ color: colors.primary }}
						>
							{runnerProfile?.acceptanceRate || 0}%
						</Text>
					</View>

					<View className="flex-row justify-between py-3">
						<Text
							className="text-base"
							style={{ color: colors.textSecondary }}
						>
							On-Time Rate
						</Text>
						<Text
							className="text-base font-bold"
							style={{ color: colors.primary }}
						>
							{runnerProfile?.onTimeRate || 0}%
						</Text>
					</View>
				</View>
			</Section>

			{/* Quick Actions */}
			<Section>
				<Text
					className="text-lg font-bold mb-4"
					style={{ color: colors.text }}
				>
					Quick Actions
				</Text>

				<View className="gap-3">
					<TouchableOpacity
						onPress={() => router.push('/(runner)/available-tasks')}
						className="rounded-2xl p-4 flex-row items-center justify-between"
						style={{ backgroundColor: colors.card }}
					>
						<View className="flex-row items-center gap-3">
							<View
								className="w-12 h-12 rounded-full items-center justify-center"
								style={{
									backgroundColor: colors.primary + '20',
								}}
							>
								<Text className="text-2xl">📦</Text>
							</View>
							<View>
								<Text
									className="text-base font-bold"
									style={{ color: colors.text }}
								>
									Available Tasks
								</Text>
								<Text
									className="text-sm"
									style={{ color: colors.textSecondary }}
								>
									View and accept new tasks
								</Text>
							</View>
						</View>
						<Text style={{ color: colors.textSecondary }}>›</Text>
					</TouchableOpacity>

					<TouchableOpacity
						onPress={() => router.push('/(runner)/earnings')}
						className="rounded-2xl p-4 flex-row items-center justify-between"
						style={{ backgroundColor: colors.card }}
					>
						<View className="flex-row items-center gap-3">
							<View
								className="w-12 h-12 rounded-full items-center justify-center"
								style={{
									backgroundColor: colors.success + '20',
								}}
							>
								<Text className="text-2xl">💰</Text>
							</View>
							<View>
								<Text
									className="text-base font-bold"
									style={{ color: colors.text }}
								>
									Earnings
								</Text>
								<Text
									className="text-sm"
									style={{ color: colors.textSecondary }}
								>
									View your earnings history
								</Text>
							</View>
						</View>
						<Text style={{ color: colors.textSecondary }}>›</Text>
					</TouchableOpacity>

					<TouchableOpacity
						onPress={() => router.push('/(runner)/settings')}
						className="rounded-2xl p-4 flex-row items-center justify-between"
						style={{ backgroundColor: colors.card }}
					>
						<View className="flex-row items-center gap-3">
							<View
								className="w-12 h-12 rounded-full items-center justify-center"
								style={{
									backgroundColor: colors.secondary + '20',
								}}
							>
								<Text className="text-2xl">⚙️</Text>
							</View>
							<View>
								<Text
									className="text-base font-bold"
									style={{ color: colors.text }}
								>
									Runner Settings
								</Text>
								<Text
									className="text-sm"
									style={{ color: colors.textSecondary }}
								>
									Manage your runner profile
								</Text>
							</View>
						</View>
						<Text style={{ color: colors.textSecondary }}>›</Text>
					</TouchableOpacity>
				</View>
			</Section>

			{/* Back to User Mode */}
			<View className="mt-6 mb-8">
				<Button
					title="Back to User Mode"
					onPress={() => router.replace('/')}
					variant="outline"
					fullWidth
					size="large"
				/>
			</View>
		</SafeAreaView>
	);
}
