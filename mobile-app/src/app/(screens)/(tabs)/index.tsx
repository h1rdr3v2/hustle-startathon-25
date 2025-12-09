import React from 'react';
import { FlatList, Text, TouchableOpacity, View } from 'react-native';
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
	const { isAuthenticated } = useAuthStore();
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
			refreshColors={['#6366f1', '#8b5cf6', '#a855f7']}
		>
			{/* Header Section */}
			<View className="mb-6 mt-2">
				<Text className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
					Instant Orders
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
				renderItem={({ item, index }) => (
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
							{/* Gradient Header */}
							<View className="h-2 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500" />

							{/* Content */}
							<View className="p-5">
								{/* Title & Badge Row */}
								<View className="flex-row items-start justify-between mb-3">
									<View className="flex-1 mr-3">
										<Text className="text-xl font-bold text-gray-900 dark:text-white mb-1">
											{item.name}
										</Text>
										<View className="flex-row items-center">
											<View className="w-2 h-2 bg-green-500 rounded-full mr-2" />
											<Text className="text-xs font-medium text-green-600 dark:text-green-400">
												Available Now
											</Text>
										</View>
									</View>

									{/* Item Number Badge */}
									<View className="bg-indigo-50 dark:bg-indigo-900/30 px-3 py-1.5 rounded-full">
										<Text className="text-xs font-bold text-indigo-600 dark:text-indigo-300">
											#{index + 1}
										</Text>
									</View>
								</View>

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
										className="bg-gradient-to-r from-indigo-600 to-purple-600 px-6 py-3.5 rounded-2xl shadow-md"
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
