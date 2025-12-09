import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { useRouter } from 'expo-router';
import { OptionCard, SafeAreaView, Subtitle, Title } from '@/src/components/ui';
import { ERRAND_TASK_OPTIONS } from '@/src/core/constants/errandTasks';
import {
	Colors,
	FontSizes,
	FontWeights,
	Spacing,
} from '@/src/core/constants/theme';
import { useColorScheme } from '@/src/core/hooks/use-color-scheme';
import { useAuthStore } from '@/src/core/stores/authStore';
import { useErrandFlowStore } from '@/src/core/stores/errandFlowStore';

export default function ErrandHomeScreen() {
	const colorScheme = useColorScheme();
	const colors = Colors[colorScheme ?? 'light'];
	const router = useRouter();
	const { setTaskType, setCurrentStep, resetFlow } = useErrandFlowStore();
	const { isAuthenticated, user } = useAuthStore();

	const handleTaskSelect = (taskType: any) => {
		if (!isAuthenticated) {
			router.push('/(auth)/login');
			return;
		}

		resetFlow();
		setTaskType(taskType);
		setCurrentStep('location_confirmation');
		router.push('/location');
	};

	return (
		<SafeAreaView spaced scrollable>
			{/* Header */}
			<View style={styles.header}>
				<Text
					style={[styles.greeting, { color: colors.textSecondary }]}
				>
					Hi {user?.name || 'there'}! 👋
				</Text>
				<Title style={styles.title}>I want to...</Title>
				<Subtitle color={colors.textSecondary} style={styles.subtitle}>
					Choose what you need help with today
				</Subtitle>
			</View>

			{/* Task Options */}
			<View style={styles.optionsContainer}>
				{ERRAND_TASK_OPTIONS.map((option) => (
					<OptionCard
						key={option.id}
						title={option.title}
						description={option.description}
						icon={option.icon}
						color={option.color}
						onPress={() => handleTaskSelect(option.id)}
					/>
				))}
			</View>

			{/* Helper Text */}
			<View style={styles.helpSection}>
				<Text style={[styles.helpTitle, { color: colors.text }]}>
					How it works
				</Text>
				<View style={styles.stepContainer}>
					<StepItem
						number="1"
						text="Choose your task type"
						color={colors.primary}
					/>
					<StepItem
						number="2"
						text="Set pickup & delivery locations"
						color={colors.primary}
					/>
					<StepItem
						number="3"
						text="Add task details & get price estimate"
						color={colors.primary}
					/>
					<StepItem
						number="4"
						text="Select a runner & confirm payment"
						color={colors.primary}
					/>
				</View>
			</View>
		</SafeAreaView>
	);
}

interface StepItemProps {
	number: string;
	text: string;
	color: string;
}

const StepItem: React.FC<StepItemProps> = ({ number, text, color }) => {
	const colorScheme = useColorScheme();
	const colors = Colors[colorScheme ?? 'light'];

	return (
		<View style={styles.stepItem}>
			<View
				style={[
					styles.stepNumber,
					{ backgroundColor: color + '20', borderColor: color },
				]}
			>
				<Text style={[styles.stepNumberText, { color: color }]}>
					{number}
				</Text>
			</View>
			<Text style={[styles.stepText, { color: colors.text }]}>
				{text}
			</Text>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	scrollView: {
		flex: 1,
	},
	scrollContent: {
		paddingHorizontal: Spacing.lg,
		paddingBottom: Spacing.xl * 2,
	},
	header: {
		marginTop: Spacing.xl,
		marginBottom: Spacing.xl,
	},
	greeting: {
		fontSize: FontSizes.md,
		marginBottom: Spacing.xs,
	},
	title: {
		marginBottom: Spacing.sm,
	},
	subtitle: {
		fontSize: FontSizes.md,
		lineHeight: 22,
	},
	optionsContainer: {
		marginBottom: Spacing.xl,
	},
	helpSection: {
		paddingTop: Spacing.lg,
	},
	helpTitle: {
		fontSize: FontSizes.lg,
		fontWeight: FontWeights.bold,
		marginBottom: Spacing.md,
	},
	stepContainer: {
		gap: Spacing.md,
	},
	stepItem: {
		flexDirection: 'row',
		alignItems: 'center',
	},
	stepNumber: {
		width: 32,
		height: 32,
		borderRadius: 16,
		borderWidth: 2,
		justifyContent: 'center',
		alignItems: 'center',
		marginRight: Spacing.md,
	},
	stepNumberText: {
		fontSize: FontSizes.md,
		fontWeight: FontWeights.bold,
	},
	stepText: {
		flex: 1,
		fontSize: FontSizes.md,
		lineHeight: 20,
	},
});
