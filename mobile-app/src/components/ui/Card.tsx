import React from 'react';
import { View, StyleSheet, ViewStyle, TouchableOpacity } from 'react-native';
import { Colors, Spacing, Radius, Shadows } from '@/src/core/constants/theme';
import { useColorScheme } from '@/src/core/hooks/use-color-scheme';

interface CardProps {
	children: React.ReactNode;
	style?: ViewStyle;
	onPress?: () => void;
	elevation?: 'sm' | 'md' | 'lg';
	padding?: number;
}

export const Card: React.FC<CardProps> = ({
	children,
	style,
	onPress,
	elevation = 'md',
	padding = Spacing.md,
}) => {
	const colorScheme = useColorScheme();
	const colors = Colors[colorScheme ?? 'light'];

	const cardStyle: ViewStyle = {
		backgroundColor: colors.cardBackground,
		borderRadius: Radius.lg,
		borderWidth: 1,
		borderColor: colors.cardBorder,
		padding,
		...Shadows[elevation],
	};

	if (onPress) {
		return (
			<TouchableOpacity
				style={[cardStyle, style]}
				onPress={onPress}
				activeOpacity={0.7}
			>
				{children}
			</TouchableOpacity>
		);
	}

	return <View style={[cardStyle, style]}>{children}</View>;
};

interface CardHeaderProps {
	children: React.ReactNode;
	style?: ViewStyle;
}

export const CardHeader: React.FC<CardHeaderProps> = ({ children, style }) => {
	return <View style={[styles.header, style]}>{children}</View>;
};

interface CardContentProps {
	children: React.ReactNode;
	style?: ViewStyle;
}

export const CardContent: React.FC<CardContentProps> = ({
	children,
	style,
}) => {
	return <View style={[styles.content, style]}>{children}</View>;
};

interface CardFooterProps {
	children: React.ReactNode;
	style?: ViewStyle;
}

export const CardFooter: React.FC<CardFooterProps> = ({ children, style }) => {
	return <View style={[styles.footer, style]}>{children}</View>;
};

const styles = StyleSheet.create({
	header: {
		marginBottom: Spacing.sm,
	},
	content: {
		flex: 1,
	},
	footer: {
		marginTop: Spacing.sm,
	},
});
