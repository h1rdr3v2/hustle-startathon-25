import React, { useState } from 'react';
import {
	ScrollView,
	StyleSheet,
	Text,
	TextInput,
	TouchableOpacity,
	View,
} from 'react-native';
import { useRouter } from 'expo-router';
import {
	Button,
	Input,
	SafeAreaView,
	Section,
	Subtitle,
	Title,
} from '@/src/components/ui';
import {
	Colors,
	FontSizes,
	FontWeights,
	Radius,
	Spacing,
} from '@/src/core/constants/theme';
import { useColorScheme } from '@/src/core/hooks/use-color-scheme';
import { useErrandFlowStore } from '@/src/core/stores/errandFlowStore';

export default function TaskDetailsScreen() {
	const colorScheme = useColorScheme();
	const colors = Colors[colorScheme ?? 'light'];
	const router = useRouter();

	const { taskType, taskDetails, setTaskDetails, setCurrentStep } =
		useErrandFlowStore();

	const [description, setDescription] = useState(
		taskDetails?.description || '',
	);
	const [itemsList, setItemsList] = useState(
		taskDetails?.items?.join('\n') || '',
	);
	const [specialInstructions, setSpecialInstructions] = useState(
		taskDetails?.specialInstructions || '',
	);
	const [scheduleNow, setScheduleNow] = useState(true);
	const [descriptionError, setDescriptionError] = useState<string | null>(
		null,
	);

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
		router.push('/price-preview');
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
					Tell us what you need
				</Subtitle>
			</View>

			{/* Description */}
			<Section>
				<Text
					className="text-base font-semibold mb-2"
					style={{ color: colors.text }}
				>
					Task Description *
				</Text>
				<TextInput
					className="border rounded-2xl p-4 text-base min-h-[100px]"
					style={{
						backgroundColor: colors.card,
						borderColor: descriptionError
							? colors.error
							: colors.border,
						color: colors.text,
					}}
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
					<Text
						className="text-sm mt-1"
						style={{ color: colors.error }}
					>
						{descriptionError}
					</Text>
				)}
			</Section>

			{/* Items List (Optional) */}
			{(taskType === 'buy_food' ||
				taskType === 'make_purchase' ||
				taskType === 'run_errand') && (
				<Section>
					<Text
						className="text-base font-semibold mb-2"
						style={{ color: colors.text }}
					>
						Items Needed (Optional)
					</Text>
					<Text
						className="text-sm mb-1"
						style={{ color: colors.textSecondary }}
					>
						One item per line
					</Text>
					<TextInput
						className="border rounded-2xl p-4 text-base min-h-[100px]"
						style={{
							backgroundColor: colors.card,
							borderColor: colors.border,
							color: colors.text,
						}}
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
				<Text
					className="text-base font-semibold mb-2"
					style={{ color: colors.text }}
				>
					Special Instructions (Optional)
				</Text>
				<TextInput
					className="border rounded-2xl p-4 text-base min-h-[100px]"
					style={{
						backgroundColor: colors.card,
						borderColor: colors.border,
						color: colors.text,
					}}
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
				<Text
					className="text-base font-semibold mb-2"
					style={{ color: colors.text }}
				>
					When do you need this?
				</Text>
				<View className="flex-row gap-4">
					<TouchableOpacity
						className="flex-1 p-4 rounded-2xl border-2 items-center"
						style={{
							backgroundColor: scheduleNow
								? colors.primary
								: colors.card,
							borderColor: scheduleNow
								? colors.primary
								: colors.border,
						}}
						onPress={() => setScheduleNow(true)}
					>
						<Text
							className="text-base font-semibold"
							style={{
								color: scheduleNow ? '#FFFFFF' : colors.text,
							}}
						>
							Now
						</Text>
					</TouchableOpacity>
					<TouchableOpacity
						className="flex-1 p-4 rounded-2xl border-2 items-center"
						style={{
							backgroundColor: !scheduleNow
								? colors.primary
								: colors.card,
							borderColor: !scheduleNow
								? colors.primary
								: colors.border,
						}}
						onPress={() => setScheduleNow(false)}
					>
						<Text
							className="text-base font-semibold"
							style={{
								color: !scheduleNow ? '#FFFFFF' : colors.text,
							}}
						>
							Schedule Later
						</Text>
					</TouchableOpacity>
				</View>
			</Section>

			{/* Info Box */}
			<View
				className="flex-row p-4 rounded-2xl border items-center"
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
					Be as detailed as possible to help your runner complete the
					task efficiently
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
