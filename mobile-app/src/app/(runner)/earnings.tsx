import React from 'react';
import { FlatList, Text, TouchableOpacity, View } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView, Section, Subtitle, Title } from '@/src/components/ui';
import { Colors } from '@/src/core/constants/theme';
import { useColorScheme } from '@/src/core/hooks/use-color-scheme';
import { useAuthStore } from '@/src/core/stores/authStore';

// Mock earnings data
const mockEarningsHistory = [
	{
		id: '1',
		taskType: 'Food Delivery',
		date: '2025-12-10',
		amount: 1200,
		status: 'completed',
	},
	{
		id: '2',
		taskType: 'Package Delivery',
		date: '2025-12-09',
		amount: 1800,
		status: 'completed',
	},
	{
		id: '3',
		taskType: 'Shopping',
		date: '2025-12-09',
		amount: 2000,
		status: 'completed',
	},
	{
		id: '4',
		taskType: 'Document Pickup',
		date: '2025-12-08',
		amount: 1500,
		status: 'completed',
	},
];

export default function EarningsScreen() {
	const colorScheme = useColorScheme();
	const colors = Colors[colorScheme ?? 'light'];
	const router = useRouter();
	const { user } = useAuthStore();

	const runnerProfile = user?.runnerProfile;
	const totalEarnings = runnerProfile?.totalEarnings || 0;
	const availableEarnings = runnerProfile?.availableEarnings || 0;

	const renderEarningItem = ({ item }: any) => (
		<View
			className="rounded-2xl p-4 mb-3 flex-row justify-between items-center"
			style={{
				backgroundColor: colors.card,
				borderWidth: 1,
				borderColor: colors.border,
			}}
		>
			<View className="flex-1">
				<Text
					className="text-base font-bold"
					style={{ color: colors.text }}
				>
					{item.taskType}
				</Text>
				<Text
					className="text-sm mt-1"
					style={{ color: colors.textSecondary }}
				>
					{new Date(item.date).toLocaleDateString('en-US', {
						month: 'short',
						day: 'numeric',
						year: 'numeric',
					})}
				</Text>
			</View>

			<View className="items-end">
				<Text
					className="text-lg font-bold"
					style={{ color: colors.success }}
				>
					+₦{item.amount.toLocaleString()}
				</Text>
				<Text
					className="text-xs px-2 py-1 rounded-full mt-1"
					style={{
						backgroundColor: colors.success + '20',
						color: colors.success,
					}}
				>
					{item.status}
				</Text>
			</View>
		</View>
	);

	return (
		<SafeAreaView>
			{/* Header */}
			<View className="px-4 pt-16 pb-2 flex-row justify-between items-center">
				<View className="flex-1">
					<Title>Earnings</Title>
					<Subtitle color={colors.textSecondary}>
						Track your income
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

			{/* Earnings Summary */}
			<View className="px-4 py-4">
				<View
					className="rounded-2xl p-6 mb-4"
					style={{
						backgroundColor: colors.primary,
					}}
				>
					<Text className="text-white text-sm mb-2 opacity-80">
						Total Earnings
					</Text>
					<Text className="text-white text-4xl font-bold mb-4">
						₦{totalEarnings.toLocaleString()}
					</Text>

					<View className="flex-row justify-between">
						<View>
							<Text className="text-white text-xs opacity-80">
								Available
							</Text>
							<Text className="text-white text-xl font-bold">
								₦{availableEarnings.toLocaleString()}
							</Text>
						</View>

						<View>
							<Text className="text-white text-xs opacity-80">
								Pending
							</Text>
							<Text className="text-white text-xl font-bold">
								₦
								{(
									totalEarnings - availableEarnings
								).toLocaleString()}
							</Text>
						</View>
					</View>
				</View>

				{/* Withdrawal Button */}
				<TouchableOpacity
					className="rounded-2xl p-4 flex-row items-center justify-center gap-2"
					style={{
						backgroundColor: colors.success,
					}}
					onPress={() => {
						// TODO: Implement withdrawal
						console.log('Withdraw earnings');
					}}
				>
					<Text className="text-white text-base font-bold">
						💰 Withdraw Earnings
					</Text>
				</TouchableOpacity>
			</View>

			{/* Statistics */}
			<View className="px-4 pb-4">
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
							This Week
						</Text>
					</View>

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
							This Month
						</Text>
					</View>
				</View>
			</View>

			{/* Earnings History Header */}
			<View className="px-4 pt-2 pb-3">
				<Text
					className="text-lg font-bold"
					style={{ color: colors.text }}
				>
					Recent Earnings
				</Text>
			</View>

			{/* Earnings List */}
			<FlatList
				data={mockEarningsHistory}
				renderItem={renderEarningItem}
				keyExtractor={(item) => item.id}
				contentContainerStyle={{ padding: 16, paddingTop: 0 }}
				ListEmptyComponent={
					<View className="items-center justify-center py-12">
						<Text className="text-6xl mb-4">💸</Text>
						<Text
							className="text-xl font-bold mb-2"
							style={{ color: colors.text }}
						>
							No Earnings Yet
						</Text>
						<Text
							className="text-base text-center"
							style={{ color: colors.textSecondary }}
						>
							Complete tasks to start earning!
						</Text>
					</View>
				}
			/>
		</SafeAreaView>
	);
}
