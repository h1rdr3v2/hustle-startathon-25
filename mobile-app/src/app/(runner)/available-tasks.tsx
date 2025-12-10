import React, { useState } from 'react';
import { FlatList, Text, TouchableOpacity, View } from 'react-native';
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

// Mock data for available tasks
const mockTasks = [
	{
		id: '1',
		type: 'Food Delivery',
		title: 'Pick up from KFC',
		pickupAddress: '123 Aba Road, Umuahia',
		deliveryAddress: '456 Main Street, Umuahia',
		distance: '2.5 km',
		payment: '₦1,200',
		estimatedTime: '25 mins',
		priority: 'high',
	},
	{
		id: '2',
		type: 'Package Delivery',
		title: 'Deliver documents',
		pickupAddress: '789 Bank Road, Umuahia',
		deliveryAddress: '321 School Lane, Umuahia',
		distance: '4.1 km',
		payment: '₦1,800',
		estimatedTime: '35 mins',
		priority: 'normal',
	},
	{
		id: '3',
		type: 'Shopping',
		title: 'Buy groceries',
		pickupAddress: 'Shoprite, Umuahia',
		deliveryAddress: '99 Garden Estate, Umuahia',
		distance: '3.2 km',
		payment: '₦2,000',
		estimatedTime: '45 mins',
		priority: 'normal',
	},
];

export default function AvailableTasksScreen() {
	const colorScheme = useColorScheme();
	const colors = Colors[colorScheme ?? 'light'];
	const router = useRouter();
	const [tasks, setTasks] = useState(mockTasks);

	const handleAcceptTask = (taskId: string) => {
		// TODO: Implement task acceptance logic
		console.log('Accept task:', taskId);
		// Remove task from list after accepting
		setTasks(tasks.filter((task) => task.id !== taskId));
	};

	const renderTask = ({ item }: any) => (
		<View
			className="rounded-2xl p-4 mb-3"
			style={{
				backgroundColor: colors.card,
				borderWidth: 1,
				borderColor:
					item.priority === 'high' ? colors.error : colors.border,
			}}
		>
			{/* Task Header */}
			<View className="flex-row justify-between items-start mb-3">
				<View className="flex-1">
					<View className="flex-row items-center gap-2 mb-1">
						<Text
							className="text-xs font-bold px-2 py-1 rounded-full"
							style={{
								backgroundColor: colors.primary + '20',
								color: colors.primary,
							}}
						>
							{item.type}
						</Text>
						{item.priority === 'high' && (
							<Text
								className="text-xs font-bold px-2 py-1 rounded-full"
								style={{
									backgroundColor: colors.error + '20',
									color: colors.error,
								}}
							>
								🔥 Urgent
							</Text>
						)}
					</View>
					<Text
						className="text-lg font-bold"
						style={{ color: colors.text }}
					>
						{item.title}
					</Text>
				</View>
				<Text
					className="text-xl font-bold"
					style={{ color: colors.success }}
				>
					{item.payment}
				</Text>
			</View>

			{/* Locations */}
			<View className="mb-3">
				<View className="flex-row items-start gap-2 mb-2">
					<Text style={{ color: colors.primary }}>📍</Text>
					<View className="flex-1">
						<Text
							className="text-xs font-semibold"
							style={{ color: colors.textSecondary }}
						>
							Pickup
						</Text>
						<Text
							className="text-sm"
							style={{ color: colors.text }}
						>
							{item.pickupAddress}
						</Text>
					</View>
				</View>

				<View className="flex-row items-start gap-2">
					<Text style={{ color: colors.success }}>🎯</Text>
					<View className="flex-1">
						<Text
							className="text-xs font-semibold"
							style={{ color: colors.textSecondary }}
						>
							Delivery
						</Text>
						<Text
							className="text-sm"
							style={{ color: colors.text }}
						>
							{item.deliveryAddress}
						</Text>
					</View>
				</View>
			</View>

			{/* Task Details */}
			<View className="flex-row justify-between items-center mb-3 py-2">
				<View className="flex-row items-center gap-1">
					<Text style={{ color: colors.textSecondary }}>📏</Text>
					<Text
						className="text-sm"
						style={{ color: colors.textSecondary }}
					>
						{item.distance}
					</Text>
				</View>

				<View className="flex-row items-center gap-1">
					<Text style={{ color: colors.textSecondary }}>⏱️</Text>
					<Text
						className="text-sm"
						style={{ color: colors.textSecondary }}
					>
						{item.estimatedTime}
					</Text>
				</View>
			</View>

			{/* Accept Button */}
			<Button
				title="Accept Task"
				onPress={() => handleAcceptTask(item.id)}
				variant="primary"
				fullWidth
			/>
		</View>
	);

	return (
		<SafeAreaView>
			{/* Header */}
			<View className="px-4 pt-16 pb-2 flex-row justify-between items-center">
				<View className="flex-1">
					<Title>Available Tasks</Title>
					<Subtitle color={colors.textSecondary}>
						{tasks.length} tasks near you
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

			{/* Filter/Sort Options */}
			<View className="px-4 py-3 flex-row gap-2">
				<TouchableOpacity
					className="px-4 py-2 rounded-full"
					style={{ backgroundColor: colors.primary }}
				>
					<Text className="text-white font-semibold text-sm">
						All Tasks
					</Text>
				</TouchableOpacity>

				<TouchableOpacity
					className="px-4 py-2 rounded-full"
					style={{
						backgroundColor: colors.card,
						borderWidth: 1,
						borderColor: colors.border,
					}}
				>
					<Text
						className="font-semibold text-sm"
						style={{ color: colors.text }}
					>
						Nearby
					</Text>
				</TouchableOpacity>

				<TouchableOpacity
					className="px-4 py-2 rounded-full"
					style={{
						backgroundColor: colors.card,
						borderWidth: 1,
						borderColor: colors.border,
					}}
				>
					<Text
						className="font-semibold text-sm"
						style={{ color: colors.text }}
					>
						High Pay
					</Text>
				</TouchableOpacity>
			</View>

			{/* Task List */}
			{tasks.length > 0 ? (
				<FlatList
					data={tasks}
					renderItem={renderTask}
					keyExtractor={(item) => item.id}
					contentContainerStyle={{ padding: 16 }}
				/>
			) : (
				<View className="flex-1 items-center justify-center px-8">
					<Text className="text-6xl mb-4">📦</Text>
					<Text
						className="text-xl font-bold mb-2 text-center"
						style={{ color: colors.text }}
					>
						No Tasks Available
					</Text>
					<Text
						className="text-base text-center"
						style={{ color: colors.textSecondary }}
					>
						All tasks have been accepted! Check back soon for new
						opportunities.
					</Text>
				</View>
			)}
		</SafeAreaView>
	);
}
