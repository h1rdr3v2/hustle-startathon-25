import React, { useEffect, useState } from 'react';
import {
	ActivityIndicator,
	ScrollView,
	StyleSheet,
	Text,
	View,
} from 'react-native';
import { useRouter } from 'expo-router';
import {
	Button,
	LoadingSpinner,
	RunnerCard,
	SafeAreaView,
	Section,
	Subtitle,
	Title,
} from '@/src/components/ui';
import {
	Colors,
	FontSizes,
	FontWeights,
	Spacing,
} from '@/src/core/constants/theme';
import { useColorScheme } from '@/src/core/hooks/use-color-scheme';
import { useErrandRunners } from '@/src/core/hooks/useRunners';
import { useErrandFlowStore } from '@/src/core/stores/errandFlowStore';

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
		if (
			runners.length > 0 &&
			!localSelectedRunner &&
			!storeSelectedRunner
		) {
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
			router.push('/confirmation');
		}
	};

	return (
		<SafeAreaView spaced scrollable>
			{/* Header */}
			<View className="mb-8">
				<Title>{taskTitle}</Title>
				<Subtitle
					color={colors.textSecondary}
					className="text-base leading-6 mt-2"
				>
					Choose your runner
				</Subtitle>
			</View>

			{/* Loading State */}
			{loading && (
				<View className="items-center py-16">
					<LoadingSpinner />
					<Text
						className="text-base mt-4"
						style={{ color: colors.textSecondary }}
					>
						Finding available runners nearby...
					</Text>
				</View>
			)}

			{/* Auto-selecting Banner */}
			{isAutoSelecting && !loading && (
				<View
					className="flex-row items-center p-4 rounded-xl border mb-4"
					style={{
						backgroundColor: colors.primary + '15',
						borderColor: colors.primary + '30',
					}}
				>
					<ActivityIndicator size="small" color={colors.primary} />
					<Text
						className="text-sm font-medium ml-2"
						style={{ color: colors.primary }}
					>
						Auto-selecting closest runner...
					</Text>
				</View>
			)}

			{/* Runners List */}
			{!loading && runners.length > 0 && (
				<Section>
					<Text
						className="text-base font-semibold mb-4"
						style={{ color: colors.text }}
					>
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
				<View className="items-center py-16">
					<Text className="text-6xl mb-4">🔍</Text>
					<Text
						className="text-xl font-bold mb-2"
						style={{ color: colors.text }}
					>
						No Runners Available
					</Text>
					<Text
						className="text-base text-center leading-6 px-8"
						style={{ color: colors.textSecondary }}
					>
						There are no runners available in your area at the
						moment. Please try again later.
					</Text>
				</View>
			)}

			{/* Info Box */}
			{runners.length > 0 && (
				<View
					className="flex-row p-4 rounded-xl border items-center"
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
						Runner will be notified immediately after confirmation
					</Text>
				</View>
			)}

			{/* Bottom Button */}
			{!loading && runners.length > 0 && (
				<View
					className="p-4 border-t mt-8"
					style={{
						backgroundColor: colors.background,
						borderTopColor: colors.border,
					}}
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
