import React, { useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { useRouter } from 'expo-router';
import {
	Button,
	ConfirmModal,
	PriceCard,
	SafeAreaView,
	Section,
	Subtitle,
	Title,
} from '@/src/components/ui';
import { Colors, Shadows } from '@/src/core/constants/theme';
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
	} = useErrandFlowStore();

	const [selectedPayment, setSelectedPayment] = useState<PaymentMethod>(
		storePaymentMethod || PAYMENT_METHODS[0],
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
		router.replace('/success');
	};

	return (
		<SafeAreaView spaced scrollable>
			{/* Header */}
			<View className="mb-8">
				<Title>Final Confirmation</Title>
				<Subtitle
					color={colors.textSecondary}
					className="text-base leading-6 mt-2"
				>
					Review and confirm your request
				</Subtitle>
			</View>

			{/* Task Summary */}
			<Section>
				<Text
					className="text-base font-semibold mb-2"
					style={{ color: colors.text }}
				>
					Task Summary
				</Text>
				<View
					className="rounded-2xl border p-4"
					style={{
						backgroundColor: colors.card,
						borderColor: colors.border,
						...Shadows.sm,
					}}
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
				<Text
					className="text-base font-semibold mb-2"
					style={{ color: colors.text }}
				>
					Locations
				</Text>
				<View
					className="rounded-2xl border p-4"
					style={{
						backgroundColor: colors.card,
						borderColor: colors.border,
						...Shadows.sm,
					}}
				>
					<View className="flex-row items-start py-2">
						<Text className="text-2xl mr-2">📍</Text>
						<View className="flex-1">
							<Text
								className="text-sm font-semibold mb-0.5"
								style={{ color: colors.primary }}
							>
								Pickup
							</Text>
							<Text
								className="text-base leading-5"
								style={{ color: colors.text }}
							>
								{pickupLocation?.address}
							</Text>
						</View>
					</View>
					<View
						className="h-px my-1"
						style={{ backgroundColor: colors.border }}
					/>
					<View className="flex-row items-start py-2">
						<Text className="text-2xl mr-2">🎯</Text>
						<View className="flex-1">
							<Text
								className="text-sm font-semibold mb-0.5"
								style={{ color: colors.primary }}
							>
								Delivery
							</Text>
							<Text
								className="text-base leading-5"
								style={{ color: colors.text }}
							>
								{deliveryLocation?.address}
							</Text>
						</View>
					</View>
				</View>
			</Section>

			{/* Runner Info */}
			{selectedRunner && (
				<Section>
					<Text
						className="text-base font-semibold mb-2"
						style={{ color: colors.text }}
					>
						Your Runner
					</Text>
					<View
						className="flex-row p-4 rounded-2xl border items-center"
						style={{
							backgroundColor: colors.card,
							borderColor: colors.border,
							...Shadows.sm,
						}}
					>
						<View
							className="w-12 h-12 rounded-full justify-center items-center mr-4"
							style={{ backgroundColor: colors.primary + '20' }}
						>
							<Text className="text-xl font-bold">
								{selectedRunner.name.charAt(0)}
							</Text>
						</View>
						<View className="flex-1">
							<Text
								className="text-lg font-semibold mb-0.5"
								style={{ color: colors.text }}
							>
								{selectedRunner.name}
							</Text>
							<View className="flex-row items-center">
								<Text className="text-sm text-gray-600 mr-1">
									⭐ {selectedRunner.rating.toFixed(1)}
								</Text>
								<Text className="text-sm text-gray-600">
									• {selectedRunner.totalDeliveries}{' '}
									deliveries
								</Text>
							</View>
						</View>
					</View>
				</Section>
			)}

			{/* Price */}
			{pricing && (
				<Section>
					<Text
						className="text-base font-semibold mb-2"
						style={{ color: colors.text }}
					>
						Payment Summary
					</Text>
					<PriceCard pricing={pricing} showDetails />
				</Section>
			)}

			{/* Payment Method */}
			<Section>
				<Text
					className="text-base font-semibold mb-2"
					style={{ color: colors.text }}
				>
					Payment Method
				</Text>
				{PAYMENT_METHODS.map((method) => (
					<TouchableOpacity
						key={method.id}
						className="flex-row p-4 rounded-2xl mb-2 items-center"
						style={{
							backgroundColor: colors.card,
							borderColor:
								selectedPayment.id === method.id
									? colors.primary
									: colors.border,
							borderWidth:
								selectedPayment.id === method.id ? 2 : 1,
							...Shadows.sm,
						}}
						onPress={() => handlePaymentSelect(method)}
					>
						<View className="mr-4">
							<Text className="text-3xl">
								{method.type === 'wallet'
									? '💰'
									: method.type === 'card'
										? '💳'
										: '💵'}
							</Text>
						</View>
						<View className="flex-1">
							<Text
								className="text-base font-semibold mb-0.5"
								style={{ color: colors.text }}
							>
								{method.label}
							</Text>
							<Text
								className="text-sm"
								style={{ color: colors.textSecondary }}
							>
								{method.details}
							</Text>
						</View>
						{selectedPayment.id === method.id && (
							<Text className="text-xl text-green-500">✓</Text>
						)}
					</TouchableOpacity>
				))}
			</Section>

			{/* Terms */}
			<View
				className="p-4 rounded-2xl border"
				style={{
					backgroundColor: colors.background,
					borderColor: colors.border,
				}}
			>
				<Text
					className="text-xs leading-5 text-center"
					style={{ color: colors.textSecondary }}
				>
					By confirming, you agree to our Terms of Service and
					acknowledge our Privacy Policy. Payment will be processed
					after task completion.
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
				confirmText="Submit"
				cancelText="Go Back"
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
	<View className="mb-2">
		<Text
			className="text-sm mb-0.5"
			style={{ color: colors.textSecondary }}
		>
			{label}
		</Text>
		<Text
			className="text-base font-medium"
			style={{ color: colors.text }}
			numberOfLines={2}
		>
			{value}
		</Text>
	</View>
);
