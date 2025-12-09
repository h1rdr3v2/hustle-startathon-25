import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import {
	SafeAreaView,
	Button,
	Title,
	Subtitle,
	Section,
	RunnerCard,
	LoadingSpinner,
} from '@/src/components/ui';
import {
	Colors,
	Spacing,
	FontSizes,
	FontWeights,
} from '@/src/core/constants/theme';
import { useColorScheme } from '@/src/core/hooks/use-color-scheme';
import { useErrandFlowStore } from '@/src/core/stores/errandFlowStore';
import { useErrandRunners } from '@/src/core/hooks/useRunners';

export default function RunnerSelectionScreen() {
	const colorScheme = useColorScheme();
	const colors = Colors[colorScheme ?? 'light'];
	const router = useRouter();

	const {
		taskType,
		pickupLocation,
		selectedRunner: storeSelectedRunner,
		setSelectedRunner: setStoreSelectedRunner,
		setCurrentStep,
	} = useErrandFlowStore();

	const {
		runners,
		loading,
		selectedRunner: localSelectedRunner,
		selectRunner,
	} = useErrandRunners({
		pickupLocation,
		autoSelect: false,
	});

	const [isAutoSelecting, setIsAutoSelecting] = useState(false);

	useEffect(() => {
		// Auto-select closest runner after 2 seconds if none selected
		if (runners.length > 0 && !localSelectedRunner && !storeSelectedRunner) {
			setIsAutoSelecting(true);
			const timer = setTimeout(() => {
				selectRunner(runners[0]);
				setStoreSelectedRunner(runners[0]);
				setIsAutoSelecting(false);
			}, 2000);
			return () => clearTimeout(timer);
		}
	}, [runners]);

	const taskTitle = taskType
		? taskType.replace(/_/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase())
		: 'Errand';

	const handleSelectRunner = (runner: any) => {
		selectRunner(runner);
		setStoreSelectedRunner(runner);
	};

	const handleContinue = () => {
		if (localSelectedRunner) {
			setCurrentStep('final_confirmation');
			router.push('/(screens)/errand/confirmation');
		}
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
					<Title>{taskTitle}</Title>
					<Subtitle color={colors.textSecondary} style={styles.subtitle}>
						Choose your runner
					</Subtitle>
				</View>

				{/* Loading State */}
				{loading && (
					<View style={styles.loadingContainer}>
						<LoadingSpinner />
						<Text style={[styles.loadingText, { color: colors.textSecondary }]}>
							Finding available runners nearby...
						</Text>
					</View>
				)}

				{/* Auto-selecting Banner */}
				{isAutoSelecting && !loading && (
					<View
						style={[
							styles.autoSelectBanner,
							{
								backgroundColor: colors.primary + '15',
								borderColor: colors.primary + '30',
							},
						]}
					>
						<ActivityIndicator size="small" color={colors.primary} />
						<Text style={[styles.autoSelectText, { color: colors.primary }]}>
							Auto-selecting closest runner...
						</Text>
					</View>
				)}

				{/* Runners List */}
				{!loading && runners.length > 0 && (
					<Section>
						<Text style={[styles.sectionTitle, { color: colors.text }]}>
							Available Runners ({runners.length})
						</Text>
						{runners.map((runner) => (
							<RunnerCard
								key={runner.id}
								runner={runner}
								onSelect={handleSelectRunner}
								selected={
									localSelectedRunner?.id === runner.id ||
									storeSelectedRunner?.id === runner.id
								}
							/>
						))}
					</Section>
				)}

				{/* Empty State */}
				{!loading && runners.length === 0 && (
					<View style={styles.emptyContainer}>
						<Text style={styles.emptyIcon}>🔍</Text>
						<Text style={[styles.emptyTitle, { color: colors.text }]}>
							No Runners Available
						</Text>
						<Text style={[styles.emptyText, { color: colors.textSecondary }]}>
							There are no runners available in your area at the moment. Please
							try again later.
						</Text>
					</View>
				)}

				{/* Info Box */}
				{runners.length > 0 && (
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
							Runner will be notified immediately after confirmation
						</Text>
					</View>
				)}
			</ScrollView>

			{/* Bottom Button */}
			{!loading && runners.length > 0 && (
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
						title="Continue to Confirmation"
						onPress={handleContinue}
						fullWidth
						size="large"
						disabled={!localSelectedRunner && !storeSelectedRunner}
					/>
				</View>
			)}
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
	loadingContainer: {
		alignItems: 'center',
		paddingVertical: Spacing.xl * 2,
	},
	loadingText: {
		fontSize: FontSizes.md,
		marginTop: Spacing.md,
	},
	autoSelectBanner: {
		flexDirection: 'row',
		alignItems: 'center',
		padding: Spacing.md,
		borderRadius: 12,
		borderWidth: 1,
		marginBottom: Spacing.lg,
	},
	autoSelectText: {
		fontSize: FontSizes.sm,
		fontWeight: FontWeights.medium,
		marginLeft: Spacing.sm,
	},
	sectionTitle: {
		fontSize: FontSizes.md,
		fontWeight: FontWeights.semibold,
		marginBottom: Spacing.md,
	},
	emptyContainer: {
		alignItems: 'center',
		paddingVertical: Spacing.xl * 2,
	},
	emptyIcon: {
		fontSize: 64,
		marginBottom: Spacing.md,
	},
	emptyTitle: {
		fontSize: FontSizes.xl,
		fontWeight: FontWeights.bold,
		marginBottom: Spacing.sm,
	},
	emptyText: {
		fontSize: FontSizes.md,
		textAlign: 'center',
		lineHeight: 22,
		paddingHorizontal: Spacing.xl,
	},
	infoBox: {
		flexDirection: 'row',
		padding: Spacing.md,
		borderRadius: 12,
		borderWidth: 1,
		alignItems: 'center',
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
