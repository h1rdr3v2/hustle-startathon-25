import React from 'react';
import { SafeAreaView, ScrollView, StyleSheet, ViewStyle } from 'react-native';
import { Colors, Layout } from '@/src/core/constants/theme';
import { useColorScheme } from '@/src/core/hooks/use-color-scheme';

interface ContainerProps {
	children: React.ReactNode;
	scrollable?: boolean;
	style?: ViewStyle;
	contentContainerStyle?: ViewStyle;
}

export const Container: React.FC<ContainerProps> = ({
	children,
	scrollable = false,
	style,
	contentContainerStyle,
}) => {
	const colorScheme = useColorScheme();
	const colors = Colors[colorScheme ?? 'light'];

	const containerStyle: ViewStyle = {
		flex: 1,
		backgroundColor: colors.background,
	};

	if (scrollable) {
		return (
			<ScrollView
				style={[containerStyle, style]}
				contentContainerStyle={[
					styles.scrollContent,
					contentContainerStyle,
				]}
				showsVerticalScrollIndicator={false}
			>
				{children}
			</ScrollView>
		);
	}

	return (
		<SafeAreaView style={[containerStyle, styles.content, style]}>
			{children}
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	content: {
		padding: Layout.screenPadding,
	},
	scrollContent: {
		padding: Layout.screenPadding,
	},
});
