import React, { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useRouter } from 'expo-router';
import { Button, SafeAreaView, Title } from '@/src/components/ui';
import {
	Colors,
	FontSizes,
	FontWeights,
	Spacing,
} from '@/src/core/constants/theme';
import { useColorScheme } from '@/src/core/hooks/use-color-scheme';
import { useErrandFlowStore } from '@/src/core/stores/errandFlowStore';

export default function SuccessScreen() {
	const colorScheme = useColorScheme();
	const colors = Colors[colorScheme ?? 'light'];
	const router = useRouter();
	const { selectedRunner, resetFlow } = useErrandFlowStore();

	useEffect(() => {
		// Reset flow after 30 seconds
		const timer = setTimeout(() => {
			resetFlow();
		}, 30000);

		return () => clearTimeout(timer);
	}, []);

	const handleViewTracking = () => {
		// Navigate to tracking screen (would be implemented)
		router.replace('/');
	};

	const handleNewRequest = () => {
		resetFlow();
		router.replace('/');
	};

	return (
		<SafeAreaView scrollable spaced>
			<View style={styles.content}>
				{/* Success Animation/Icon */}
				<View
					style={[
						styles.iconContainer,
						{ backgroundColor: '#10B981' + '20' },
					]}
				>
					<Text style={styles.successIcon}>✓</Text>
				</View>

				{/* Title */}
				<Title style={styles.title}>Request Submitted!</Title>

				{/* Message */}
				<Text style={[styles.message, { color: colors.textSecondary }]}>
					Your errand request has been successfully submitted.{' '}
					{selectedRunner?.name} has been notified and will start
					working on your task shortly.
				</Text>

				{/* Info Cards */}
				<View style={styles.infoContainer}>
					<View
						style={[
							styles.infoCard,
							{
								backgroundColor: colors.card,
								borderColor: colors.border,
							},
						]}
					>
						<Text style={styles.infoEmoji}>👤</Text>
						<Text
							style={[
								styles.infoLabel,
								{ color: colors.textSecondary },
							]}
						>
							Runner
						</Text>
						<Text
							style={[styles.infoValue, { color: colors.text }]}
						>
							{selectedRunner?.name || 'Assigned'}
						</Text>
					</View>

					<View
						style={[
							styles.infoCard,
							{
								backgroundColor: colors.card,
								borderColor: colors.border,
							},
						]}
					>
						<Text style={styles.infoEmoji}>⏱️</Text>
						<Text
							style={[
								styles.infoLabel,
								{ color: colors.textSecondary },
							]}
						>
							Est. Arrival
						</Text>
						<Text
							style={[styles.infoValue, { color: colors.text }]}
						>
							{selectedRunner?.estimatedArrival || 15} min
						</Text>
					</View>
				</View>

				{/* Next Steps */}
				<View
					style={[
						styles.stepsContainer,
						{
							backgroundColor: colors.primary + '10',
							borderColor: colors.primary + '30',
						},
					]}
				>
					<Text style={[styles.stepsTitle, { color: colors.text }]}>
						What's Next?
					</Text>
					<View style={styles.stepItem}>
						<Text style={styles.stepNumber}>1</Text>
						<Text style={[styles.stepText, { color: colors.text }]}>
							Your runner will accept and start the task
						</Text>
					</View>
					<View style={styles.stepItem}>
						<Text style={styles.stepNumber}>2</Text>
						<Text style={[styles.stepText, { color: colors.text }]}>
							You'll receive updates throughout the process
						</Text>
					</View>
					<View style={styles.stepItem}>
						<Text style={styles.stepNumber}>3</Text>
						<Text style={[styles.stepText, { color: colors.text }]}>
							Payment will be processed after completion
						</Text>
					</View>
				</View>
			</View>

			{/* Bottom Buttons */}
			<View style={styles.buttonContainer}>
				<Button
					title="View Tracking"
					onPress={handleViewTracking}
					fullWidth
					size="large"
					variant="primary"
					style={styles.button}
				/>
				<Button
					title="Create New Request"
					onPress={handleNewRequest}
					fullWidth
					size="large"
					variant="outline"
				/>
			</View>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingHorizontal: Spacing.lg,
	},
	content: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		paddingVertical: Spacing.xl,
	},
	iconContainer: {
		width: 100,
		height: 100,
		borderRadius: 50,
		justifyContent: 'center',
		alignItems: 'center',
		marginBottom: Spacing.xl,
	},
	successIcon: {
		fontSize: 48,
		color: '#10B981',
		fontWeight: FontWeights.bold,
	},
	title: {
		textAlign: 'center',
		marginBottom: Spacing.md,
	},
	message: {
		fontSize: FontSizes.md,
		lineHeight: 24,
		textAlign: 'center',
		marginBottom: Spacing.xl,
		paddingHorizontal: Spacing.md,
	},
	infoContainer: {
		flexDirection: 'row',
		gap: Spacing.md,
		marginBottom: Spacing.xl,
		width: '100%',
	},
	infoCard: {
		flex: 1,
		padding: Spacing.md,
		borderRadius: 16,
		borderWidth: 1,
		alignItems: 'center',
	},
	infoEmoji: {
		fontSize: 32,
		marginBottom: Spacing.xs,
	},
	infoLabel: {
		fontSize: FontSizes.sm,
		marginBottom: 2,
	},
	infoValue: {
		fontSize: FontSizes.md,
		fontWeight: FontWeights.bold,
	},
	stepsContainer: {
		width: '100%',
		padding: Spacing.md,
		borderRadius: 16,
		borderWidth: 1,
	},
	stepsTitle: {
		fontSize: FontSizes.md,
		fontWeight: FontWeights.bold,
		marginBottom: Spacing.md,
	},
	stepItem: {
		flexDirection: 'row',
		alignItems: 'flex-start',
		marginBottom: Spacing.sm,
	},
	stepNumber: {
		width: 24,
		height: 24,
		borderRadius: 12,
		backgroundColor: '#10B981',
		color: '#FFFFFF',
		fontSize: FontSizes.sm,
		fontWeight: FontWeights.bold,
		textAlign: 'center',
		lineHeight: 24,
		marginRight: Spacing.sm,
	},
	stepText: {
		flex: 1,
		fontSize: FontSizes.sm,
		lineHeight: 20,
	},
	buttonContainer: {
		paddingBottom: Spacing.lg,
		gap: Spacing.md,
	},
	button: {
		marginBottom: 0,
	},
});
