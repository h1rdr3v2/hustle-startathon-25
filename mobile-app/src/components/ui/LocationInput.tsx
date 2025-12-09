import React, { useState } from 'react';
import {
	ActivityIndicator,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from 'react-native';
import {
	Colors,
	FontSizes,
	FontWeights,
	Radius,
	Shadows,
	Spacing,
} from '@/src/core/constants/theme';
import { useColorScheme } from '@/src/core/hooks/use-color-scheme';
import type { ErrandLocation } from '@/src/core/types';

interface LocationInputProps {
	label: string;
	location: ErrandLocation | null;
	onPress: () => void;
	onDetectLocation?: () => void;
	loading?: boolean;
	error?: string;
}

export const LocationInput: React.FC<LocationInputProps> = ({
	label,
	location,
	onPress,
	onDetectLocation,
	loading = false,
	error,
}) => {
	const colorScheme = useColorScheme();
	const colors = Colors[colorScheme ?? 'light'];

	return (
		<View style={styles.container}>
			<Text style={[styles.label, { color: colors.text }]}>{label}</Text>

			<TouchableOpacity
				style={[
					styles.inputContainer,
					{
						backgroundColor: colors.card,
						borderColor: error ? colors.error : colors.border,
					},
					Shadows.sm,
				]}
				onPress={onPress}
				disabled={loading}
			>
				<View style={styles.locationContent}>
					<Text style={styles.icon}>📍</Text>
					<View style={styles.addressContainer}>
						{location ? (
							<>
								<Text
									style={[
										styles.address,
										{ color: colors.text },
									]}
									numberOfLines={1}
								>
									{location.address}
								</Text>
								<Text
									style={[
										styles.city,
										{ color: colors.textSecondary },
									]}
									numberOfLines={1}
								>
									{location.city}
								</Text>
							</>
						) : (
							<Text
								style={[
									styles.placeholder,
									{ color: colors.textSecondary },
								]}
							>
								Tap to select location
							</Text>
						)}
					</View>
				</View>
			</TouchableOpacity>

			{onDetectLocation && (
				<TouchableOpacity
					style={[
						styles.detectButton,
						{ backgroundColor: colors.primary + '15' },
					]}
					onPress={onDetectLocation}
					disabled={loading}
				>
					{loading ? (
						<ActivityIndicator
							size="small"
							color={colors.primary}
						/>
					) : (
						<>
							<Text style={styles.detectIcon}>📡</Text>
							<Text
								style={[
									styles.detectText,
									{ color: colors.primary },
								]}
							>
								Detect Current Location
							</Text>
						</>
					)}
				</TouchableOpacity>
			)}

			{error && (
				<Text style={[styles.error, { color: colors.error }]}>
					{error}
				</Text>
			)}
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		marginBottom: Spacing.lg,
	},
	label: {
		fontSize: FontSizes.md,
		fontWeight: FontWeights.semibold,
		marginBottom: Spacing.sm,
	},
	inputContainer: {
		borderRadius: Radius.md,
		borderWidth: 1,
		padding: Spacing.md,
	},
	locationContent: {
		flexDirection: 'row',
		alignItems: 'center',
	},
	icon: {
		fontSize: 24,
		marginRight: Spacing.sm,
	},
	addressContainer: {
		flex: 1,
	},
	address: {
		fontSize: FontSizes.md,
		fontWeight: FontWeights.medium,
		marginBottom: 2,
	},
	city: {
		fontSize: FontSizes.sm,
	},
	placeholder: {
		fontSize: FontSizes.md,
	},
	detectButton: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
		padding: Spacing.sm,
		borderRadius: Radius.md,
		marginTop: Spacing.sm,
	},
	detectIcon: {
		fontSize: 16,
		marginRight: Spacing.xs,
	},
	detectText: {
		fontSize: FontSizes.sm,
		fontWeight: FontWeights.medium,
	},
	error: {
		fontSize: FontSizes.sm,
		marginTop: Spacing.xs,
	},
});
