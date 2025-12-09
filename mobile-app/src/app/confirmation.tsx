import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import {
	SafeAreaView,
	Button,
	Title,
	Subtitle,
	Section,
	PriceCard,
	ConfirmModal,
} from '@/src/components/ui';
import {
	Colors,
	Spacing,
	FontSizes,
	FontWeights,
	Radius,
	Shadows,
} from '@/src/core/constants/theme';
import { useColorScheme } from '@/src/core/hooks/use-color-scheme';
import { useErrandFlowStore } from '@/src/core/stores/errandFlowStore';
import type { PaymentMethod } from '@/src/core/types';

// Mock payment methods
const PAYMENT_METHODS: PaymentMethod[] = [
	{
		id: '1',
		type: 'wallet',
		label: 'Hustle Wallet',
		details: 'Balance: ₦15,000',
		isDefault: true,
	},
	{
		id: '2',
		type: 'card',
		label: 'Credit Card',
		details: '**** 4242',
		isDefault: false,
	},
	{
		id: '3',
		type: 'cash',
		label: 'Cash on Delivery',
		details: 'Pay with cash',
		isDefault: false,
	},
];

export default function ConfirmationScreen() {
	const colorScheme = useColorScheme();
	const colors = Colors[colorScheme ?? 'light'];
	const router = useRouter();

	const {
		taskType,
		pickupLocation,
		deliveryLocation,
		taskDetails,
		pricing,
		selectedRunner,
		paymentMethod: storePaymentMethod,
		setPaymentMethod: setStorePaymentMethod,
		setStatus,
		resetFlow,
	} = useErrandFlowStore();

	const [selectedPayment, setSelectedPayment] = useState<PaymentMethod>(
		storePaymentMethod || PAYMENT_METHODS[0]
	);
	const [showConfirmModal, setShowConfirmModal] = useState(false);
	const [isSubmitting, setIsSubmitting] = useState(false);

	const taskTitle = taskType
		? taskType.replace(/_/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase())
		: 'Errand';

	const handlePaymentSelect = (method: PaymentMethod) => {
		setSelectedPayment(method);
		setStorePaymentMethod(method);
	};

	const handleConfirm = () => {
		setShowConfirmModal(true);
	};

	const handleFinalConfirm = async () => {
		setIsSubmitting(true);

		// Simulate API call
		await new Promise((resolve) => setTimeout(resolve, 2000));

		setIsSubmitting(false);
		setShowConfirmModal(false);
		setStatus('pending_assignment');

		// Navigate to success/tracking screen
		router.replace('/(screens)/errand/success');
	};

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
					<Title>Final Confirmation</Title>
					<Subtitle color={colors.textSecondary} style={styles.subtitle}>
						Review and confirm your request
					</Subtitle>
				</View>

				{/* Task Summary */}
				<Section>
					<Text style={[styles.sectionTitle, { color: colors.text }]}>
						Task Summary
					</Text>
					<View
						style={[
							styles.summaryCard,
							{
								backgroundColor: colors.card,
								borderColor: colors.border,
							},
							Shadows.sm,
						]}
					>
						<SummaryRow
							label="Task Type"
							value={taskTitle}
							colors={colors}
						/>
						<SummaryRow
							label="Description"
							value={taskDetails?.description || 'N/A'}
							colors={colors}
						/>
						{taskDetails?.items && taskDetails.items.length > 0 && (
							<SummaryRow
								label="Items"
								value={`${taskDetails.items.length} item(s)`}
								colors={colors}
							/>
						)}
						{taskDetails?.specialInstructions && (
							<SummaryRow
								label="Special Instructions"
								value={taskDetails.specialInstructions}
								colors={colors}
							/>
						)}
					</View>
				</Section>

				{/* Locations */}
				<Section>
					<Text style={[styles.sectionTitle, { color: colors.text }]}>
						Locations
					</Text>
					<View
						style={[
							styles.summaryCard,
							{
								backgroundColor: colors.card,
								borderColor: colors.border,
							},
							Shadows.sm,
						]}
					>
						<View style={styles.locationRow}>
							<Text style={styles.locationIcon}>📍</Text>
							<View style={styles.locationContent}>
								<Text style={[styles.locationLabel, { color: colors.primary }]}>
									Pickup
								</Text>
								<Text style={[styles.locationAddress, { color: colors.text }]}>
									{pickupLocation?.address}
								</Text>
							</View>
						</View>
						<View style={[styles.divider, { backgroundColor: colors.border }]} />
						<View style={styles.locationRow}>
							<Text style={styles.locationIcon}>🎯</Text>
							<View style={styles.locationContent}>
								<Text style={[styles.locationLabel, { color: colors.primary }]}>
									Delivery
								</Text>
								<Text style={[styles.locationAddress, { color: colors.text }]}>
									{deliveryLocation?.address}
								</Text>
							</View>
						</View>
					</View>
				</Section>

				{/* Runner Info */}
				{selectedRunner && (
					<Section>
						<Text style={[styles.sectionTitle, { color: colors.text }]}>
							Your Runner
						</Text>
						<View
							style={[
								styles.runnerCard,
								{
									backgroundColor: colors.card,
									borderColor: colors.border,
								},
								Shadows.sm,
							]}
						>
							<View
								style={[
									styles.runnerAvatar,
									{ backgroundColor: colors.primary + '20' },
								]}
							>
								<Text style={styles.runnerInitial}>
									{selectedRunner.name.charAt(0)}
								</Text>
							</View>
							<View style={styles.runnerInfo}>
								<Text style={[styles.runnerName, { color: colors.text }]}>
									{selectedRunner.name}
								</Text>
								<View style={styles.runnerStats}>
									<Text style={styles.runningStat}>
										⭐ {selectedRunner.rating.toFixed(1)}
									</Text>
									<Text style={styles.runningStat}>
										• {selectedRunner.totalDeliveries} deliveries
									</Text>
								</View>
							</View>
						</View>
					</Section>
				)}

				{/* Price */}
				{pricing && (
					<Section>
						<Text style={[styles.sectionTitle, { color: colors.text }]}>
							Payment Summary
						</Text>
						<PriceCard pricing={pricing} showDetails />
					</Section>
				)}

				{/* Payment Method */}
				<Section>
					<Text style={[styles.sectionTitle, { color: colors.text }]}>
						Payment Method
					</Text>
					{PAYMENT_METHODS.map((method) => (
						<TouchableOpacity
							key={method.id}
							style={[
								styles.paymentMethod,
								{
									backgroundColor: colors.card,
									borderColor:
										selectedPayment.id === method.id
											? colors.primary
											: colors.border,
									borderWidth: selectedPayment.id === method.id ? 2 : 1,
								},
								Shadows.sm,
							]}
							onPress={() => handlePaymentSelect(method)}
						>
							<View style={styles.paymentIcon}>
								<Text style={styles.paymentEmoji}>
									{method.type === 'wallet'
										? '💰'
										: method.type === 'card'
											? '💳'
											: '💵'}
								</Text>
							</View>
							<View style={styles.paymentInfo}>
								<Text style={[styles.paymentLabel, { color: colors.text }]}>
									{method.label}
								</Text>
								<Text
									style={[styles.paymentDetails, { color: colors.textSecondary }]}
								>
									{method.details}
								</Text>
							</View>
							{selectedPayment.id === method.id && (
								<Text style={styles.checkmark}>✓</Text>
							)}
						</TouchableOpacity>
					))}
				</Section>

				{/* Terms */}
				<View
					style={[
						styles.termsBox,
						{
							backgroundColor: colors.background,
							borderColor: colors.border,
						},
					]}
				>
					<Text style={[styles.termsText, { color: colors.textSecondary }]}>
						By confirming, you agree to our Terms of Service and acknowledge our
						Privacy Policy. Payment will be processed after task completion.
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
					title="Confirm & Submit Request"
					onPress={handleConfirm}
					fullWidth
					size="large"
				/>
			</View>

			{/* Confirmation Modal */}
			<ConfirmModal
				visible={showConfirmModal}
				title="Confirm Request"
				message="Are you ready to submit this errand request? Your runner will be notified immediately."
				confirmText="Yes, Submit"
				cancelText="Review Again"
				onConfirm={handleFinalConfirm}
				onCancel={() => setShowConfirmModal(false)}
				loading={isSubmitting}
			/>
		</SafeAreaView>
	);
}

interface SummaryRowProps {
	label: string;
	value: string;
	colors: any;
}

const SummaryRow: React.FC<SummaryRowProps> = ({ label, value, colors }) => (
	<View style={styles.summaryRow}>
		<Text style={[styles.summaryLabel, { color: colors.textSecondary }]}>
			{label}
		</Text>
		<Text style={[styles.summaryValue, { color: colors.text }]} numberOfLines={2}>
			{value}
		</Text>
	</View>
);

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
	sectionTitle: {
		fontSize: FontSizes.md,
		fontWeight: FontWeights.semibold,
		marginBottom: Spacing.sm,
	},
	summaryCard: {
		borderRadius: Radius.lg,
		borderWidth: 1,
		padding: Spacing.md,
	},
	summaryRow: {
		marginBottom: Spacing.sm,
	},
	summaryLabel: {
		fontSize: FontSizes.sm,
		marginBottom: 2,
	},
	summaryValue: {
		fontSize: FontSizes.md,
		fontWeight: FontWeights.medium,
	},
	locationRow: {
		flexDirection: 'row',
		alignItems: 'flex-start',
		paddingVertical: Spacing.sm,
	},
	locationIcon: {
		fontSize: 24,
		marginRight: Spacing.sm,
	},
	locationContent: {
		flex: 1,
	},
	locationLabel: {
		fontSize: FontSizes.sm,
		fontWeight: FontWeights.semibold,
		marginBottom: 2,
	},
	locationAddress: {
		fontSize: FontSizes.md,
		lineHeight: 20,
	},
	divider: {
		height: 1,
		marginVertical: Spacing.xs,
	},
	runnerCard: {
		flexDirection: 'row',
		padding: Spacing.md,
		borderRadius: Radius.lg,
		borderWidth: 1,
		alignItems: 'center',
	},
	runnerAvatar: {
		width: 50,
		height: 50,
		borderRadius: 25,
		justifyContent: 'center',
		alignItems: 'center',
		marginRight: Spacing.md,
	},
	runnerInitial: {
		fontSize: 20,
		fontWeight: FontWeights.bold,
	},
	runnerInfo: {
		flex: 1,
	},
	runnerName: {
		fontSize: FontSizes.lg,
		fontWeight: FontWeights.semibold,
		marginBottom: 2,
	},
	runnerStats: {
		flexDirection: 'row',
		alignItems: 'center',
	},
	runningStat: {
		fontSize: FontSizes.sm,
		color: '#666',
		marginRight: Spacing.xs,
	},
	paymentMethod: {
		flexDirection: 'row',
		padding: Spacing.md,
		borderRadius: Radius.lg,
		marginBottom: Spacing.sm,
		alignItems: 'center',
	},
	paymentIcon: {
		marginRight: Spacing.md,
	},
	paymentEmoji: {
		fontSize: 28,
	},
	paymentInfo: {
		flex: 1,
	},
	paymentLabel: {
		fontSize: FontSizes.md,
		fontWeight: FontWeights.semibold,
		marginBottom: 2,
	},
	paymentDetails: {
		fontSize: FontSizes.sm,
	},
	checkmark: {
		fontSize: 20,
		color: '#4CAF50',
	},
	termsBox: {
		padding: Spacing.md,
		borderRadius: Radius.md,
		borderWidth: 1,
	},
	termsText: {
		fontSize: FontSizes.xs,
		lineHeight: 18,
		textAlign: 'center',
	},
	bottomContainer: {
		padding: Spacing.lg,
		borderTopWidth: 1,
	},
});
