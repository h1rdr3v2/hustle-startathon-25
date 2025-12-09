import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput } from 'react-native';
import { useRouter } from 'expo-router';
import {
	SafeAreaView,
	Button,
	Title,
	Subtitle,
	Section,
	PriceCard,
} from '@/src/components/ui';
import {
	Colors,
	Spacing,
	FontSizes,
	FontWeights,
	Radius,
} from '@/src/core/constants/theme';
import { useColorScheme } from '@/src/core/hooks/use-color-scheme';
import { useErrandFlowStore } from '@/src/core/stores/errandFlowStore';
import { useLocation } from '@/src/core/hooks/useLocation';
import { usePriceEstimation } from '@/src/core/hooks/usePriceEstimation';

export default function PricePreviewScreen() {
	const colorScheme = useColorScheme();
	const colors = Colors[colorScheme ?? 'light'];
	const router = useRouter();

	const {
		taskType,
		pickupLocation,
		deliveryLocation,
		pricing,
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
		router.push('/(screens)/errand/runner-selection');
	};

	const needsItemCost =
		taskType === 'buy_food' ||
		taskType === 'make_purchase' ||
		taskType === 'run_errand';

	return (
		<SafeAreaView
			style={[styles.container, { backgroundColor: colors.background }]}
		>
			<ScrollView
				style={styles.scrollView}
				contentContainerStyle={styles.scrollContent}
				showsVerticalScrollIndicator={false}
			>
				{/* Header */}
				<View style={styles.header}>
					<Title>{taskTitle}</Title>
					<Subtitle color={colors.textSecondary} style={styles.subtitle}>
						Review estimated costs
					</Subtitle>
				</View>

				{/* Item Purchase Cost (if applicable) */}
				{needsItemCost && (
					<Section>
						<Text style={[styles.label, { color: colors.text }]}>
							Estimated Item Cost (Optional)
						</Text>
						<Text
							style={[styles.helperText, { color: colors.textSecondary }]}
						>
							Enter the approximate cost of items to be purchased
						</Text>
						<View
							style={[
								styles.inputContainer,
								{
									backgroundColor: colors.card,
									borderColor: colors.border,
								},
							]}
						>
							<Text style={[styles.currencySymbol, { color: colors.text }]}>
								₦
							</Text>
							<TextInput
								style={[styles.input, { color: colors.text }]}
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
						<Text style={[styles.label, { color: colors.text }]}>
							Price Breakdown
						</Text>
						<PriceCard pricing={estimatedPricing} showDetails />
					</Section>
				)}

				{/* Coupon Code */}
				<Section>
					<Text style={[styles.label, { color: colors.text }]}>
						Have a Coupon?
					</Text>
					<View style={styles.couponRow}>
						<TextInput
							style={[
								styles.couponInput,
								{
									backgroundColor: colors.card,
									borderColor: colors.border,
									color: colors.text,
								},
							]}
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
							style={styles.couponButton}
						/>
					</View>
					{couponApplied && (
						<View style={styles.successBadge}>
							<Text style={styles.successIcon}>✓</Text>
							<Text style={[styles.successText, { color: '#10B981' }]}>
								Coupon applied successfully!
							</Text>
						</View>
					)}
				</Section>

				{/* Info Boxes */}
				<View
					style={[
						styles.infoBox,
						{
							backgroundColor: colors.primary + '10',
							borderColor: colors.primary + '30',
						},
					]}
				>
					<Text style={styles.infoIcon}>💡</Text>
					<Text style={[styles.infoText, { color: colors.text }]}>
						Final price may vary based on actual items purchased and distance
						traveled
					</Text>
				</View>

				<View
					style={[
						styles.infoBox,
						{
							backgroundColor: '#10B981' + '10',
							borderColor: '#10B981' + '30',
						},
					]}
				>
					<Text style={styles.infoIcon}>🔒</Text>
					<Text style={[styles.infoText, { color: colors.text }]}>
						Payment will be processed after task completion
					</Text>
				</View>
			</ScrollView>

			{/* Bottom Button */}
			<View
				style={[
					styles.bottomContainer,
					{
						backgroundColor: colors.background,
						borderTopColor: colors.border,
					},
				]}
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

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	scrollView: {
		flex: 1,
	},
	scrollContent: {
		paddingHorizontal: Spacing.lg,
		paddingTop: Spacing.lg,
		paddingBottom: Spacing.xl * 2,
	},
	header: {
		marginBottom: Spacing.xl,
	},
	subtitle: {
		fontSize: FontSizes.md,
		lineHeight: 22,
		marginTop: Spacing.sm,
	},
	label: {
		fontSize: FontSizes.md,
		fontWeight: FontWeights.semibold,
		marginBottom: Spacing.sm,
	},
	helperText: {
		fontSize: FontSizes.sm,
		marginBottom: Spacing.sm,
	},
	inputContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		borderWidth: 1,
		borderRadius: Radius.md,
		paddingHorizontal: Spacing.md,
	},
	currencySymbol: {
		fontSize: FontSizes.lg,
		fontWeight: FontWeights.semibold,
		marginRight: Spacing.xs,
	},
	input: {
		flex: 1,
		fontSize: FontSizes.lg,
		paddingVertical: Spacing.md,
	},
	couponRow: {
		flexDirection: 'row',
		gap: Spacing.sm,
	},
	couponInput: {
		flex: 1,
		borderWidth: 1,
		borderRadius: Radius.md,
		paddingHorizontal: Spacing.md,
		paddingVertical: Spacing.sm,
		fontSize: FontSizes.md,
	},
	couponButton: {
		minWidth: 90,
	},
	successBadge: {
		flexDirection: 'row',
		alignItems: 'center',
		marginTop: Spacing.sm,
	},
	successIcon: {
		fontSize: 16,
		color: '#10B981',
		marginRight: Spacing.xs,
	},
	successText: {
		fontSize: FontSizes.sm,
		fontWeight: FontWeights.medium,
	},
	infoBox: {
		flexDirection: 'row',
		padding: Spacing.md,
		borderRadius: Radius.md,
		borderWidth: 1,
		alignItems: 'center',
		marginBottom: Spacing.md,
	},
	infoIcon: {
		fontSize: 20,
		marginRight: Spacing.sm,
	},
	infoText: {
		flex: 1,
		fontSize: FontSizes.sm,
		lineHeight: 20,
	},
	bottomContainer: {
		padding: Spacing.lg,
		borderTopWidth: 1,
	},
});
