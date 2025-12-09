import React, { useState } from 'react';
import {
	View,
	TextInput,
	StyleSheet,
	ViewStyle,
	TextInputProps,
	TouchableOpacity,
} from 'react-native';
import { Colors, Spacing, Radius, FontSizes } from '@/src/core/constants/theme';
import { useColorScheme } from '@/src/core/hooks/use-color-scheme';
import { BodyText, Label } from './Typography';

interface InputProps extends TextInputProps {
	label?: string;
	error?: string;
	leftIcon?: React.ReactNode;
	rightIcon?: React.ReactNode;
	containerStyle?: ViewStyle;
	onRightIconPress?: () => void;
}

export const Input: React.FC<InputProps> = ({
	label,
	error,
	leftIcon,
	rightIcon,
	containerStyle,
	onRightIconPress,
	...textInputProps
}) => {
	const colorScheme = useColorScheme();
	const colors = Colors[colorScheme ?? 'light'];
	const [isFocused, setIsFocused] = useState(false);

	return (
		<View style={[styles.container, containerStyle]}>
			{label && <Label style={styles.label}>{label}</Label>}
			<View
				style={[
					styles.inputContainer,
					{
						backgroundColor: colors.inputBackground,
						borderColor: error
							? colors.error
							: isFocused
								? colors.primary
								: colors.inputBorder,
					},
				]}
			>
				{leftIcon && <View style={styles.leftIcon}>{leftIcon}</View>}
				<TextInput
					style={[
						styles.input,
						{
							color: colors.text,
							flex: 1,
						},
					]}
					placeholderTextColor={colors.inputPlaceholder}
					onFocus={() => setIsFocused(true)}
					onBlur={() => setIsFocused(false)}
					{...textInputProps}
				/>
				{rightIcon &&
					(onRightIconPress ? (
						<TouchableOpacity
							onPress={onRightIconPress}
							style={styles.rightIcon}
						>
							{rightIcon}
						</TouchableOpacity>
					) : (
						<View style={styles.rightIcon}>{rightIcon}</View>
					))}
			</View>
			{error && (
				<BodyText color={colors.error} style={styles.error}>
					{error}
				</BodyText>
			)}
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		marginBottom: Spacing.md,
	},
	label: {
		marginBottom: Spacing.xs,
	},
	inputContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		borderRadius: Radius.md,
		borderWidth: 1.5,
		paddingHorizontal: Spacing.md,
	},
	input: {
		paddingVertical: Spacing.sm + 2,
		fontSize: FontSizes.md,
	},
	leftIcon: {
		marginRight: Spacing.sm,
	},
	rightIcon: {
		marginLeft: Spacing.sm,
	},
	error: {
		marginTop: Spacing.xs,
		fontSize: FontSizes.sm,
	},
});
