import React from 'react';
import { Alert, Text, View } from 'react-native';
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
	const { user, logout } = useAuthStore();

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
			<View className="mt-8 mb-6 items-center">
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
			</View>

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
