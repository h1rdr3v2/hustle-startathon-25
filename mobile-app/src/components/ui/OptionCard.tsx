import React from 'react';
import {
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
	ViewStyle,
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

interface OptionCardProps {
	title: string;
	description: string;
	icon: string;
	color: string;
	onPress: () => void;
	style?: ViewStyle;
	selected?: boolean;
}

export const OptionCard: React.FC<OptionCardProps> = ({
	title,
	description,
	icon,
	color,
	onPress,
	style,
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
					borderColor: selected ? color : colors.border,
					borderWidth: selected ? 2 : 1,
				},
				Shadows.sm,
				style,
			]}
			onPress={onPress}
			activeOpacity={0.7}
		>
			<View
				style={[
					styles.iconContainer,
					{ backgroundColor: color + '20' },
				]}
			>
				<Text style={styles.icon}>{icon}</Text>
			</View>
			<View style={styles.content}>
				<Text
					style={[
						styles.title,
						{
							color: colors.text,
						},
					]}
				>
					{title}
				</Text>
				<Text
					style={[
						styles.description,
						{
							color: colors.textSecondary,
						},
					]}
					numberOfLines={2}
				>
					{description}
				</Text>
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
		alignItems: 'center',
	},
	iconContainer: {
		width: 56,
		height: 56,
		borderRadius: Radius.md,
		justifyContent: 'center',
		alignItems: 'center',
		marginRight: Spacing.md,
	},
	icon: {
		fontSize: 28,
	},
	content: {
		flex: 1,
	},
	title: {
		fontSize: FontSizes.lg,
		fontWeight: FontWeights.semibold,
		marginBottom: Spacing.xs,
	},
	description: {
		fontSize: FontSizes.sm,
		lineHeight: 18,
	},
});
