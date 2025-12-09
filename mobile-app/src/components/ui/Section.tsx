import React from 'react';
import { StyleSheet, View, ViewStyle } from 'react-native';
import { Spacing } from '@/src/core/constants/theme';

interface SectionProps {
	children: React.ReactNode;
	style?: ViewStyle;
	spacing?: keyof typeof Spacing;
}

export const Section: React.FC<SectionProps> = ({
	children,
	style,
	spacing = 'lg',
}) => {
	return (
		<View
			style={[
				styles.container,
				{ marginBottom: Spacing[spacing] },
				style,
			]}
		>
			{children}
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		width: '100%',
	},
});
