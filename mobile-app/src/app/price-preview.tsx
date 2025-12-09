import React, { useEffect, useState } from 'react';
import { Text, TextInput, View } from 'react-native';
import { useRouter } from 'expo-router';
import {
	Button,
	PriceCard,
	SafeAreaView,
	Section,
	Subtitle,
	Title,
} from '@/src/components/ui';
import { Colors } from '@/src/core/constants/theme';
import { useColorScheme } from '@/src/core/hooks/use-color-scheme';
import { useLocation } from '@/src/core/hooks/useLocation';
import { usePriceEstimation } from '@/src/core/hooks/usePriceEstimation';
import { useErrandFlowStore } from '@/src/core/stores/errandFlowStore';

export default function PricePreviewScreen() {
	const colorScheme = useColorScheme();
	const colors = Colors[colorScheme ?? 'light'];
	const router = useRouter();

	const {
		taskType,
		pickupLocation,
		deliveryLocation,
		setPricing,
		setCouponCode,
		couponCode,
		setCurrentStep,
	} = useErrandFlowStore();

	const { calculateDistance } = useLocation();
	const [itemCost, setItemCost] = useState('0');
	const [couponInput, setCouponInput] = useState(couponCode || '');
	const [couponApplied, setCouponApplied] = useState(false);

	const estimatedPricing = usePriceEstimation({
		pickupLocation,
		deliveryLocation,
		itemPurchaseCost: parseFloat(itemCost) || 0,
		couponDiscount: couponApplied ? 200 : 0, // Mock 200 NGN discount
		calculateDistance,
	});

	useEffect(() => {
		if (estimatedPricing) {
			setPricing(estimatedPricing);
		}
	}, [estimatedPricing]);

	const taskTitle = taskType
		? taskType.replace(/_/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase())
		: 'Errand';

	const handleApplyCoupon = () => {
		if (couponInput.trim()) {
			setCouponCode(couponInput.trim());
			setCouponApplied(true);
		}
	};

	const handleContinue = () => {
		setCurrentStep('runner_assignment');
		router.push('/runner-selection');
	};

	const needsItemCost =
		taskType === 'buy_food' ||
		taskType === 'make_purchase' ||
		taskType === 'run_errand';

	return (
		<SafeAreaView spaced scrollable>
			{/* Header */}
			<View className="mb-8">
				<Title>{taskTitle}</Title>
				<Subtitle
					color={colors.textSecondary}
					className="text-base leading-6 mt-2"
				>
					Review estimated costs
				</Subtitle>
			</View>

			{/* Item Purchase Cost (if applicable) */}
			{needsItemCost && (
				<Section>
					<Text
						className="text-base font-semibold mb-2"
						style={{ color: colors.text }}
					>
						Estimated Item Cost (Optional)
					</Text>
					<Text
						className="text-sm mb-2"
						style={{ color: colors.textSecondary }}
					>
						Enter the approximate cost of items to be purchased
					</Text>
					<View
						className="flex-row items-center border rounded-2xl px-4"
						style={{
							backgroundColor: colors.card,
							borderColor: colors.border,
						}}
					>
						<Text
							className="text-lg font-semibold mr-1"
							style={{ color: colors.text }}
						>
							₦
						</Text>
						<TextInput
							className="flex-1 text-lg py-4"
							style={{ color: colors.text }}
							value={itemCost}
							onChangeText={setItemCost}
							placeholder="0"
							placeholderTextColor={colors.textSecondary}
							keyboardType="numeric"
						/>
					</View>
				</Section>
			)}

			{/* Price Breakdown */}
			{estimatedPricing && (
				<Section>
					<Text
						className="text-base font-semibold mb-2"
						style={{ color: colors.text }}
					>
						Price Breakdown
					</Text>
					<PriceCard pricing={estimatedPricing} showDetails />
				</Section>
			)}

			{/* Coupon Code */}
			<Section>
				<Text
					className="text-base font-semibold mb-2"
					style={{ color: colors.text }}
				>
					Have a Coupon?
				</Text>
				<View className="flex-row gap-2">
					<TextInput
						className="flex-1 border rounded-2xl px-4 py-2 text-base"
						style={{
							backgroundColor: colors.card,
							borderColor: colors.border,
							color: colors.text,
						}}
						value={couponInput}
						onChangeText={(text) => {
							setCouponInput(text);
							setCouponApplied(false);
						}}
						placeholder="Enter coupon code"
						placeholderTextColor={colors.textSecondary}
						editable={!couponApplied}
					/>
					<Button
						title={couponApplied ? 'Applied' : 'Apply'}
						onPress={handleApplyCoupon}
						size="medium"
						variant={couponApplied ? 'secondary' : 'primary'}
						disabled={couponApplied || !couponInput.trim()}
						style={{ minWidth: 90 }}
					/>
				</View>
				{couponApplied && (
					<View className="flex-row items-center mt-2">
						<Text
							className="text-base mr-1"
							style={{ color: '#10B981' }}
						>
							✓
						</Text>
						<Text
							className="text-sm font-medium"
							style={{ color: '#10B981' }}
						>
							Coupon applied successfully!
						</Text>
					</View>
				)}
			</Section>

			{/* Info Boxes */}
			<View
				className="flex-row p-4 rounded-2xl border items-center mb-4"
				style={{
					backgroundColor: colors.primary + '10',
					borderColor: colors.primary + '30',
				}}
			>
				<Text className="text-xl mr-2">💡</Text>
				<Text
					className="flex-1 text-sm leading-5"
					style={{ color: colors.text }}
				>
					Final price may vary based on actual items purchased and
					distance traveled
				</Text>
			</View>

			<View
				className="flex-row p-4 rounded-2xl border items-center mb-4"
				style={{
					backgroundColor: '#10B981' + '10',
					borderColor: '#10B981' + '30',
				}}
			>
				<Text className="text-xl mr-2">🔒</Text>
				<Text
					className="flex-1 text-sm leading-5"
					style={{ color: colors.text }}
				>
					Payment will be processed after task completion
				</Text>
			</View>

			{/* Bottom Button */}
			<View
				className="p-4 border-t mt-8"
				style={{
					backgroundColor: colors.background,
					borderTopColor: colors.border,
				}}
			>
				<Button
					title="Select Runner"
					onPress={handleContinue}
					fullWidth
					size="large"
					disabled={!estimatedPricing}
				/>
			</View>
		</SafeAreaView>
	);
}
