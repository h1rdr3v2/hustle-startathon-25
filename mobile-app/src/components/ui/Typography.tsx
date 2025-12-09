import React from 'react';
import { Text, TextStyle, StyleSheet } from 'react-native';
import {
	Colors,
	FontSizes,
	FontWeights,
	LineHeights,
} from '@/src/core/constants/theme';
import { useColorScheme } from '@/src/core/hooks/use-color-scheme';

interface TypographyProps {
	children: React.ReactNode;
	color?: string;
	align?: 'left' | 'center' | 'right' | 'justify';
	style?: TextStyle;
	numberOfLines?: number;
}

export const Title: React.FC<TypographyProps> = ({
	children,
	color,
	align = 'left',
	style,
	numberOfLines,
}) => {
	const colorScheme = useColorScheme();
	const colors = Colors[colorScheme ?? 'light'];

	return (
		<Text
			style={[
				styles.title,
				{
					color: color || colors.text,
					textAlign: align,
				},
				style,
			]}
			numberOfLines={numberOfLines}
		>
			{children}
		</Text>
	);
};

export const Subtitle: React.FC<TypographyProps> = ({
	children,
	color,
	align = 'left',
	style,
	numberOfLines,
}) => {
	const colorScheme = useColorScheme();
	const colors = Colors[colorScheme ?? 'light'];

	return (
		<Text
			style={[
				styles.subtitle,
				{
					color: color || colors.text,
					textAlign: align,
				},
				style,
			]}
			numberOfLines={numberOfLines}
		>
			{children}
		</Text>
	);
};

export const BodyText: React.FC<TypographyProps> = ({
	children,
	color,
	align = 'left',
	style,
	numberOfLines,
}) => {
	const colorScheme = useColorScheme();
	const colors = Colors[colorScheme ?? 'light'];

	return (
		<Text
			style={[
				styles.body,
				{
					color: color || colors.text,
					textAlign: align,
				},
				style,
			]}
			numberOfLines={numberOfLines}
		>
			{children}
		</Text>
	);
};

export const Caption: React.FC<TypographyProps> = ({
	children,
	color,
	align = 'left',
	style,
	numberOfLines,
}) => {
	const colorScheme = useColorScheme();
	const colors = Colors[colorScheme ?? 'light'];

	return (
		<Text
			style={[
				styles.caption,
				{
					color: color || colors.textSecondary,
					textAlign: align,
				},
				style,
			]}
			numberOfLines={numberOfLines}
		>
			{children}
		</Text>
	);
};

export const Label: React.FC<TypographyProps> = ({
	children,
	color,
	align = 'left',
	style,
	numberOfLines,
}) => {
	const colorScheme = useColorScheme();
	const colors = Colors[colorScheme ?? 'light'];

	return (
		<Text
			style={[
				styles.label,
				{
					color: color || colors.textSecondary,
					textAlign: align,
				},
				style,
			]}
			numberOfLines={numberOfLines}
		>
			{children}
		</Text>
	);
};

const styles = StyleSheet.create({
	title: {
		fontSize: FontSizes.xxxl,
		fontWeight: FontWeights.bold,
		lineHeight: LineHeights.xxxl,
	},
	subtitle: {
		fontSize: FontSizes.xl,
		fontWeight: FontWeights.semibold,
		lineHeight: LineHeights.xl,
	},
	body: {
		fontSize: FontSizes.md,
		fontWeight: FontWeights.regular,
		lineHeight: LineHeights.md,
	},
	caption: {
		fontSize: FontSizes.sm,
		fontWeight: FontWeights.regular,
		lineHeight: LineHeights.sm,
	},
	label: {
		fontSize: FontSizes.xs,
		fontWeight: FontWeights.medium,
		lineHeight: LineHeights.xs,
		textTransform: 'uppercase',
		letterSpacing: 0.5,
	},
});
