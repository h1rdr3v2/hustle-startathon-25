import React from 'react';
import { View, ActivityIndicator, StyleSheet, ViewStyle } from 'react-native';
import { Colors, Spacing } from '@/src/core/constants/theme';
import { useColorScheme } from '@/src/core/hooks/use-color-scheme';
import { BodyText } from './Typography';

interface LoadingSpinnerProps {
	message?: string;
	size?: 'small' | 'large';
	style?: ViewStyle;
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
	message,
	size = 'large',
	style,
}) => {
	const colorScheme = useColorScheme();
	const colors = Colors[colorScheme ?? 'light'];

	return (
		<View style={[styles.container, style]}>
			<ActivityIndicator size={size} color={colors.primary} />
			{message && (
				<BodyText style={styles.message} color={colors.textSecondary}>
					{message}
				</BodyText>
			)}
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	message: {
		marginTop: Spacing.md,
	},
});
