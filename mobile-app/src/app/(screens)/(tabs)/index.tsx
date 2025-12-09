import React from 'react';
import {
	FlatList,
	ImageBackground,
	Text,
	TouchableOpacity,
	View,
} from 'react-native';
import { useRouter } from 'expo-router';
import { LoadingSpinner, SafeAreaView } from '@/src/components/ui';
import { usePredefinedItems } from '@/src/core/hooks/useItems';
import { useAuthStore } from '@/src/core/stores/authStore';
import { formatCurrency } from '@/src/core/utils/helpers';

export default function InstantTab() {
	const {
		data: items = [],
		isLoading,
		refetch,
		isRefetching,
	} = usePredefinedItems();
	const { isAuthenticated, user } = useAuthStore();
	const router = useRouter();

	const handleOrder = (itemId: string) => {
		if (!isAuthenticated) {
			router.push('/(auth)/login');
			return;
		}
		router.push(`/(screens)/instant/${itemId}`);
	};

	const handleRefresh = async () => {
		await refetch();
	};

	if (isLoading && !isRefetching) {
		return (
			<SafeAreaView
				className="bg-gradient-to-br from-indigo-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-indigo-950"
				spaced
			>
				<View className="flex-1 items-center justify-center">
					<LoadingSpinner />
				</View>
			</SafeAreaView>
		);
	}

	return (
		<SafeAreaView
			scrollable
			spaced
			bounces
			refreshing={isRefetching}
			onRefresh={handleRefresh}
		>
			{/* Header Section */}
			<View className="mb-6 mt-2">
				<Text className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
					Hi {user?.name || 'Guest'}
				</Text>
				<Text className="text-base text-gray-600 dark:text-gray-300">
					Quick delivery at your fingertips
				</Text>
			</View>

			{/* Featured Badge */}
			{items.length > 0 && (
				<View className="flex-row items-center mb-4">
					<View className="bg-indigo-100 dark:bg-indigo-900/30 px-3 py-1.5 rounded-full">
						<Text className="text-sm font-semibold text-indigo-700 dark:text-indigo-300">
							{items.length} Available Items
						</Text>
					</View>
				</View>
			)}

			{/* Items Grid */}
			<FlatList
				data={items}
				keyExtractor={(i) => i.id}
				scrollEnabled={false}
				contentContainerStyle={{ paddingBottom: 20 }}
				showsVerticalScrollIndicator={false}
				renderItem={({ item }) => (
					<TouchableOpacity
						activeOpacity={0.95}
						onPress={() => handleOrder(item.id)}
						className="mb-4 overflow-hidden"
						style={{
							transform: [{ scale: 1 }],
						}}
					>
						{/* Card Container */}
						<View className="bg-white dark:bg-gray-800 rounded-3xl overflow-hidden shadow-lg border border-gray-100 dark:border-gray-700">
							{/* Image with Dark Overlay and Service Name */}
							<View className="relative h-48">
								<ImageBackground
									source={{
										uri:
											item.image ||
											'https://via.placeholder.com/400x200?text=No+Image',
									}}
									className="w-full h-full"
									resizeMode="cover"
								>
									{/* Dark Overlay */}
									<View className="absolute inset-0 bg-black/50" />

									{/* Service Name on Image */}
									<View className="absolute inset-0 justify-end p-5">
										<Text className="text-2xl font-bold text-white mb-1">
											{item.name}
										</Text>
										<View className="flex-row items-center">
											<View className="w-2 h-2 bg-green-500 rounded-full mr-2" />
											<Text className="text-xs font-medium text-green-400">
												Available Now
											</Text>
										</View>
									</View>
								</ImageBackground>
							</View>

							{/* Content */}
							<View className="p-5">
								{/* Description */}
								<Text
									className="text-sm text-gray-600 dark:text-gray-300 mb-4 leading-5"
									numberOfLines={2}
								>
									{item.description}
								</Text>

								{/* Divider */}
								<View className="h-px bg-gray-100 dark:bg-gray-700 mb-4" />

								{/* Price & Action Row */}
								<View className="flex-row items-center justify-between">
									{/* Price */}
									<View>
										<Text className="text-xs text-gray-500 dark:text-gray-400 mb-1">
											Price
										</Text>
										<Text className="text-2xl font-extrabold text-indigo-600 dark:text-indigo-400">
											{formatCurrency(item.price)}
										</Text>
									</View>

									{/* Order Button */}
									<TouchableOpacity
										onPress={() => handleOrder(item.id)}
										activeOpacity={0.8}
										className="bg-gradient-to-r bg-blue-600 px-6 py-3.5 rounded-2xl shadow-md"
									>
										<View className="flex-row items-center">
											<Text className="text-white font-bold text-sm mr-1">
												{isAuthenticated
													? 'Order Now'
													: 'Sign In'}
											</Text>
											<Text className="text-white text-base">
												→
											</Text>
										</View>
									</TouchableOpacity>
								</View>
							</View>
						</View>
					</TouchableOpacity>
				)}
				ListEmptyComponent={
					<View className="items-center justify-center py-20">
						<View className="w-24 h-24 bg-gray-100 dark:bg-gray-800 rounded-full items-center justify-center mb-4">
							<Text className="text-4xl">📦</Text>
						</View>
						<Text className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
							No Items Available
						</Text>
						<Text className="text-sm text-gray-500 dark:text-gray-400 text-center px-8">
							Check back later for new items
						</Text>
					</View>
				}
			/>
		</SafeAreaView>
	);
}
