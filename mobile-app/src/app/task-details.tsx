import React, { useState } from 'react';
import {
	View,
	Text,
	StyleSheet,
	ScrollView,
	TextInput,
	TouchableOpacity,
} from 'react-native';
import { useRouter } from 'expo-router';
import {
	SafeAreaView,
	Button,
	Title,
	Subtitle,
	Section,
	Input,
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

export default function TaskDetailsScreen() {
	const colorScheme = useColorScheme();
	const colors = Colors[colorScheme ?? 'light'];
	const router = useRouter();

	const { taskType, taskDetails, setTaskDetails, setCurrentStep } =
		useErrandFlowStore();

	const [description, setDescription] = useState(taskDetails?.description || '');
	const [itemsList, setItemsList] = useState(
		taskDetails?.items?.join('\n') || ''
	);
	const [specialInstructions, setSpecialInstructions] = useState(
		taskDetails?.specialInstructions || ''
	);
	const [scheduleNow, setScheduleNow] = useState(true);
	const [descriptionError, setDescriptionError] = useState<string | null>(null);

	const taskTitle = taskType
		? taskType.replace(/_/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase())
		: 'Errand';

	const handleContinue = () => {
		if (!description.trim()) {
			setDescriptionError('Please describe what you need');
			return;
		}

		const items = itemsList
			.split('\n')
			.filter((item) => item.trim())
			.map((item) => item.trim());

		setTaskDetails({
			description: description.trim(),
			items: items.length > 0 ? items : undefined,
			specialInstructions: specialInstructions.trim() || undefined,
			scheduledTime: scheduleNow ? undefined : new Date(),
		});

		setCurrentStep('price_preview');
		router.push('/(screens)/errand/price-preview');
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
						Tell us what you need
					</Subtitle>
				</View>

				{/* Description */}
				<Section>
					<Text style={[styles.label, { color: colors.text }]}>
						Task Description *
					</Text>
					<TextInput
						style={[
							styles.textArea,
							{
								backgroundColor: colors.card,
								borderColor: descriptionError
									? colors.error
									: colors.border,
								color: colors.text,
							},
						]}
						value={description}
						onChangeText={(text) => {
							setDescription(text);
							setDescriptionError(null);
						}}
						placeholder="Describe what you need help with..."
						placeholderTextColor={colors.textSecondary}
						multiline
						numberOfLines={4}
						textAlignVertical="top"
					/>
					{descriptionError && (
						<Text style={[styles.errorText, { color: colors.error }]}>
							{descriptionError}
						</Text>
					)}
				</Section>

				{/* Items List (Optional) */}
				{(taskType === 'buy_food' ||
					taskType === 'make_purchase' ||
					taskType === 'run_errand') && (
					<Section>
						<Text style={[styles.label, { color: colors.text }]}>
							Items Needed (Optional)
						</Text>
						<Text
							style={[
								styles.helperText,
								{ color: colors.textSecondary },
							]}
						>
							One item per line
						</Text>
						<TextInput
							style={[
								styles.textArea,
								{
									backgroundColor: colors.card,
									borderColor: colors.border,
									color: colors.text,
								},
							]}
							value={itemsList}
							onChangeText={setItemsList}
							placeholder="e.g., Rice&#10;Tomatoes&#10;Cooking oil"
							placeholderTextColor={colors.textSecondary}
							multiline
							numberOfLines={5}
							textAlignVertical="top"
						/>
					</Section>
				)}

				{/* Special Instructions */}
				<Section>
					<Text style={[styles.label, { color: colors.text }]}>
						Special Instructions (Optional)
					</Text>
					<TextInput
						style={[
							styles.textArea,
							{
								backgroundColor: colors.card,
								borderColor: colors.border,
								color: colors.text,
							},
						]}
						value={specialInstructions}
						onChangeText={setSpecialInstructions}
						placeholder="Any special requirements or preferences..."
						placeholderTextColor={colors.textSecondary}
						multiline
						numberOfLines={3}
						textAlignVertical="top"
					/>
				</Section>

				{/* Schedule Options */}
				<Section>
					<Text style={[styles.label, { color: colors.text }]}>
						When do you need this?
					</Text>
					<View style={styles.scheduleOptions}>
						<TouchableOpacity
							style={[
								styles.scheduleOption,
								{
									backgroundColor: scheduleNow
										? colors.primary
										: colors.card,
									borderColor: scheduleNow
										? colors.primary
										: colors.border,
								},
							]}
							onPress={() => setScheduleNow(true)}
						>
							<Text
								style={[
									styles.scheduleOptionText,
									{ color: scheduleNow ? '#FFFFFF' : colors.text },
								]}
							>
								Now
							</Text>
						</TouchableOpacity>
						<TouchableOpacity
							style={[
								styles.scheduleOption,
								{
									backgroundColor: !scheduleNow
										? colors.primary
										: colors.card,
									borderColor: !scheduleNow
										? colors.primary
										: colors.border,
								},
							]}
							onPress={() => setScheduleNow(false)}
						>
							<Text
								style={[
									styles.scheduleOptionText,
									{ color: !scheduleNow ? '#FFFFFF' : colors.text },
								]}
							>
								Schedule Later
							</Text>
						</TouchableOpacity>
					</View>
				</Section>

				{/* Info Box */}
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
						Be as detailed as possible to help your runner complete the task
						efficiently
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
					title="Continue"
					onPress={handleContinue}
					fullWidth
					size="large"
					disabled={!description.trim()}
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
		marginBottom: Spacing.xs,
	},
	textArea: {
		borderWidth: 1,
		borderRadius: Radius.md,
		padding: Spacing.md,
		fontSize: FontSizes.md,
		minHeight: 100,
	},
	errorText: {
		fontSize: FontSizes.sm,
		marginTop: Spacing.xs,
	},
	scheduleOptions: {
		flexDirection: 'row',
		gap: Spacing.md,
	},
	scheduleOption: {
		flex: 1,
		padding: Spacing.md,
		borderRadius: Radius.md,
		borderWidth: 2,
		alignItems: 'center',
	},
	scheduleOptionText: {
		fontSize: FontSizes.md,
		fontWeight: FontWeights.semibold,
	},
	infoBox: {
		flexDirection: 'row',
		padding: Spacing.md,
		borderRadius: Radius.md,
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
