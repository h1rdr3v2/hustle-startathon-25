import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {
	Colors,
	FontSizes,
	FontWeights,
	Radius,
	Shadows,
	Spacing,
} from '@/src/core/constants/theme';
import { useColorScheme } from '@/src/core/hooks/use-color-scheme';
import type { ErrandPricing } from '@/src/core/types';
import { formatCurrency } from '@/src/core/utils/helpers';

interface PriceCardProps {
	pricing: ErrandPricing;
	showDetails?: boolean;
}

export const PriceCard: React.FC<PriceCardProps> = ({
	pricing,
	showDetails = true,
}) => {
	const colorScheme = useColorScheme();
	const colors = Colors[colorScheme ?? 'light'];

	const PriceRow = ({
		label,
		amount,
		isTotal = false,
	}: {
		label: string;
		amount: number;
		isTotal?: boolean;
	}) => (
		<View style={styles.priceRow}>
			<Text
				style={[
					isTotal ? styles.totalLabel : styles.priceLabel,
					{ color: colors.text },
				]}
			>
				{label}
			</Text>
			<Text
				style={[
					isTotal ? styles.totalAmount : styles.priceAmount,
					{ color: isTotal ? colors.primary : colors.text },
				]}
			>
				{formatCurrency(amount)}
			</Text>
		</View>
	);

	return (
		<View
			style={[
				styles.container,
				{ backgroundColor: colors.card, borderColor: colors.border },
				Shadows.sm,
			]}
		>
			{showDetails && (
				<>
					<PriceRow label="Base Fee" amount={pricing.baseFee} />
					<PriceRow
						label={`Distance Fee (${pricing.estimatedDistance.toFixed(1)} km)`}
						amount={pricing.distanceFee}
					/>
					{pricing.itemPurchaseCost > 0 && (
						<PriceRow
							label="Item Purchase Cost"
							amount={pricing.itemPurchaseCost}
						/>
					)}
					<PriceRow
						label="Platform Fee"
						amount={pricing.platformFee}
					/>
					{pricing.discount > 0 && (
						<PriceRow label="Discount" amount={-pricing.discount} />
					)}
					<View
						style={[
							styles.divider,
							{ backgroundColor: colors.border },
						]}
					/>
				</>
			)}
			<PriceRow
				label="Total Amount"
				amount={pricing.totalAmount}
				isTotal
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		borderRadius: Radius.lg,
		borderWidth: 1,
		padding: Spacing.md,
	},
	priceRow: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		marginBottom: Spacing.sm,
	},
	priceLabel: {
		fontSize: FontSizes.md,
	},
	priceAmount: {
		fontSize: FontSizes.md,
		fontWeight: FontWeights.medium,
	},
	totalLabel: {
		fontSize: FontSizes.lg,
		fontWeight: FontWeights.bold,
	},
	totalAmount: {
		fontSize: FontSizes.xl,
		fontWeight: FontWeights.bold,
	},
	divider: {
		height: 1,
		marginVertical: Spacing.sm,
	},
});
