import React from 'react';
import {
	View,
	Text,
	TouchableOpacity,
	StyleSheet,
	Image,
	FlatList,
} from 'react-native';
import {
	Colors,
	Spacing,
	Radius,
	FontSizes,
	FontWeights,
	Shadows,
} from '@/src/core/constants/theme';
import { useColorScheme } from '@/src/core/hooks/use-color-scheme';
import type { SelectedRunner } from '@/src/core/types';

interface RunnerCardProps {
	runner: SelectedRunner;
	onSelect: (runner: SelectedRunner) => void;
	selected?: boolean;
}

export const RunnerCard: React.FC<RunnerCardProps> = ({
	runner,
	onSelect,
	selected = false,
}) => {
	const colorScheme = useColorScheme();
	const colors = Colors[colorScheme ?? 'light'];

	return (
		<TouchableOpacity
			style={[
				styles.container,
				{
					backgroundColor: colors.card,
					borderColor: selected ? colors.primary : colors.border,
					borderWidth: selected ? 2 : 1,
				},
				Shadows.sm,
			]}
			onPress={() => onSelect(runner)}
			activeOpacity={0.7}
		>
			<View style={styles.profileContainer}>
				{runner.profilePicture ? (
					<Image
						source={{ uri: runner.profilePicture }}
						style={styles.profileImage}
					/>
				) : (
					<View
						style={[
							styles.profilePlaceholder,
							{ backgroundColor: colors.primary + '20' },
						]}
					>
						<Text style={styles.profileInitial}>
							{runner.name.charAt(0).toUpperCase()}
						</Text>
					</View>
				)}
			</View>

			<View style={styles.infoContainer}>
				<View style={styles.nameRow}>
					<Text style={[styles.name, { color: colors.text }]}>
						{runner.name}
					</Text>
					{selected && <Text style={styles.checkmark}>✓</Text>}
				</View>

				<View style={styles.statsRow}>
					<View style={styles.stat}>
						<Text style={styles.statIcon}>⭐</Text>
						<Text style={[styles.statText, { color: colors.textSecondary }]}>
							{runner.rating.toFixed(1)}
						</Text>
					</View>
					<View style={styles.stat}>
						<Text style={styles.statIcon}>📦</Text>
						<Text style={[styles.statText, { color: colors.textSecondary }]}>
							{runner.totalDeliveries} deliveries
						</Text>
					</View>
				</View>

				<View style={styles.detailsRow}>
					<Text style={[styles.detail, { color: colors.textSecondary }]}>
						{runner.distance.toFixed(1)} km away
					</Text>
					<Text style={[styles.detail, { color: colors.primary }]}>
						~{runner.estimatedArrival} min
					</Text>
				</View>
			</View>
		</TouchableOpacity>
	);
};

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		padding: Spacing.md,
		borderRadius: Radius.lg,
		marginBottom: Spacing.md,
	},
	profileContainer: {
		marginRight: Spacing.md,
	},
	profileImage: {
		width: 60,
		height: 60,
		borderRadius: 30,
	},
	profilePlaceholder: {
		width: 60,
		height: 60,
		borderRadius: 30,
		justifyContent: 'center',
		alignItems: 'center',
	},
	profileInitial: {
		fontSize: 24,
		fontWeight: FontWeights.bold,
	},
	infoContainer: {
		flex: 1,
	},
	nameRow: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		marginBottom: Spacing.xs,
	},
	name: {
		fontSize: FontSizes.lg,
		fontWeight: FontWeights.semibold,
	},
	checkmark: {
		fontSize: 20,
		color: '#4CAF50',
	},
	statsRow: {
		flexDirection: 'row',
		marginBottom: Spacing.xs,
	},
	stat: {
		flexDirection: 'row',
		alignItems: 'center',
		marginRight: Spacing.md,
	},
	statIcon: {
		fontSize: 14,
		marginRight: 4,
	},
	statText: {
		fontSize: FontSizes.sm,
	},
	detailsRow: {
		flexDirection: 'row',
		justifyContent: 'space-between',
	},
	detail: {
		fontSize: FontSizes.sm,
	},
});
