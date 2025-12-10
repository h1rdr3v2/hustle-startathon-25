import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { useRouter } from 'expo-router';
import { OptionCard, SafeAreaView, Subtitle, Title } from '@/src/components/ui';
import { ERRAND_TASK_OPTIONS } from '@/src/core/constants/errandTasks';
import { Colors } from '@/src/core/constants/theme';
import { useColorScheme } from '@/src/core/hooks/use-color-scheme';
import { useAuthStore } from '@/src/core/stores/authStore';
import { useErrandFlowStore } from '@/src/core/stores/errandFlowStore';

export default function ErrandHomeScreen() {
	const colorScheme = useColorScheme();
	const colors = Colors[colorScheme ?? 'light'];
	const router = useRouter();
	const { setTaskType, setCurrentStep, resetFlow } = useErrandFlowStore();
	const { isAuthenticated, user } = useAuthStore();

	const handleTaskSelect = (taskType: any) => {
		if (!isAuthenticated) {
			router.push('/(auth)/login');
			return;
		}

		resetFlow();
		setTaskType(taskType);
		setCurrentStep('location_confirmation');
		router.push('/location');
	};

	return (
		<SafeAreaView spaced scrollable>
			{/* Header with Avatar */}
			<View className="mb-8">
				{/* Avatar and Welcome Row */}
				<View className="flex-row justify-between  mb-2 items-center">
					<View className="flex-1">
						<Text
							className="text-base mb-1"
							style={{ color: colors.textSecondary }}
						>
							Hi {user?.name || 'there'}! 👋
						</Text>
					</View>

					{isAuthenticated ? (
						<TouchableOpacity
							onPress={() => router.push('/profile')}
							className="w-12 h-12 rounded-full items-center justify-center"
							style={{ backgroundColor: colors.primary + '20' }}
						>
							<Text className="text-xl">
								{user?.name
									? user.name.charAt(0).toUpperCase()
									: '👤'}
							</Text>
						</TouchableOpacity>
					) : (
						<TouchableOpacity
							onPress={() => router.push('/(auth)/login')}
							className="px-4 py-2 rounded-full"
							style={{ backgroundColor: colors.primary }}
						>
							<Text className="text-white font-semibold">
								Login
							</Text>
						</TouchableOpacity>
					)}
				</View>

				<Title>I want to...</Title>
				<Subtitle color={colors.textSecondary}>
					Choose what you need help with today
				</Subtitle>
			</View>

			{/* Runner Mode Button - Only show if user is approved runner */}
			{isAuthenticated && user?.runnerStatus === 'approved' && (
				<TouchableOpacity
					onPress={() => router.push('/(runner)/dashboard')}
					className="rounded-2xl p-4 mb-6 flex-row items-center justify-between"
					style={{
						backgroundColor: colors.success,
						shadowColor: '#000',
						shadowOffset: { width: 0, height: 2 },
						shadowOpacity: 0.1,
						shadowRadius: 8,
						elevation: 3,
					}}
				>
					<View className="flex-row items-center gap-3 flex-1">
						<View
							className="w-12 h-12 rounded-full items-center justify-center"
							style={{
								backgroundColor: 'rgba(255, 255, 255, 0.3)',
							}}
						>
							<Text className="text-2xl">🏃</Text>
						</View>
						<View className="flex-1">
							<Text className="text-white text-lg font-bold">
								Runner Mode
							</Text>
							<Text className="text-white text-sm opacity-90">
								Switch to runner dashboard
							</Text>
						</View>
					</View>
					<Text className="text-white text-2xl">›</Text>
				</TouchableOpacity>
			)}

			{/* Task Options */}
			<View className="mb-8">
				{ERRAND_TASK_OPTIONS.map((option) => (
					<OptionCard
						key={option.id}
						title={option.title}
						description={option.description}
						icon={option.icon}
						color={option.color}
						onPress={() => handleTaskSelect(option.id)}
					/>
				))}
			</View>

			{/* Helper Text */}
			<View className="pt-4">
				<Text
					className="text-lg font-bold mb-4"
					style={{ color: colors.text }}
				>
					How it works
				</Text>
				<View className="gap-4">
					<StepItem
						number="1"
						text="Choose your task type"
						color={colors.primary}
					/>
					<StepItem
						number="2"
						text="Set pickup & delivery locations"
						color={colors.primary}
					/>
					<StepItem
						number="3"
						text="Add task details & get price estimate"
						color={colors.primary}
					/>
					<StepItem
						number="4"
						text="Select a runner & confirm payment"
						color={colors.primary}
					/>
				</View>
			</View>
		</SafeAreaView>
	);
}

interface StepItemProps {
	number: string;
	text: string;
	color: string;
}

const StepItem: React.FC<StepItemProps> = ({ number, text, color }) => {
	const colorScheme = useColorScheme();
	const colors = Colors[colorScheme ?? 'light'];

	return (
		<View className="flex-row items-center">
			<View
				className="w-8 h-8 rounded-full border-2 justify-center items-center mr-4"
				style={{ backgroundColor: color + '20', borderColor: color }}
			>
				<Text className="text-base font-bold" style={{ color: color }}>
					{number}
				</Text>
			</View>
			<Text
				className="flex-1 text-base leading-5"
				style={{ color: colors.text }}
			>
				{text}
			</Text>
		</View>
	);
};
