import React from 'react';
import {
	ActivityIndicator,
	StyleSheet,
	Text,
	TextStyle,
	TouchableOpacity,
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

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
type ButtonSize = 'small' | 'medium' | 'large';

interface ButtonProps {
	title: string;
	className?: string;
	onPress: () => void;
	variant?: ButtonVariant;
	size?: ButtonSize;
	disabled?: boolean;
	loading?: boolean;
	fullWidth?: boolean;
	icon?: React.ReactNode;
	style?: ViewStyle;
	textStyle?: TextStyle;
}

export const Button: React.FC<ButtonProps> = ({
	title,
	className,
	onPress,
	variant = 'primary',
	size = 'medium',
	disabled = false,
	loading = false,
	fullWidth = false,
	icon,
	style,
	textStyle,
}) => {
	const colorScheme = useColorScheme();
	const colors = Colors[colorScheme ?? 'light'];

	const getButtonStyle = (): ViewStyle => {
		const baseStyle: ViewStyle = {
			...styles.base,
			...getSizeStyle(),
			...Shadows.sm,
		};

		if (fullWidth) {
			baseStyle.width = '100%';
		}

		switch (variant) {
			case 'primary':
				return { ...baseStyle, backgroundColor: colors.primary };
			case 'secondary':
				return { ...baseStyle, backgroundColor: colors.secondary };
			case 'outline':
				return {
					...baseStyle,
					backgroundColor: 'transparent',
					borderWidth: 1.5,
					borderColor: colors.primary,
				};
			case 'ghost':
				return {
					...baseStyle,
					backgroundColor: 'transparent',
					shadowOpacity: 0,
					elevation: 0,
				};
			case 'danger':
				return { ...baseStyle, backgroundColor: colors.error };
			default:
				return baseStyle;
		}
	};

	const getSizeStyle = (): ViewStyle => {
		switch (size) {
			case 'small':
				return {
					paddingVertical: Spacing.xs,
					paddingHorizontal: Spacing.md,
				};
			case 'large':
				return {
					paddingVertical: Spacing.md + 2,
					paddingHorizontal: Spacing.xl,
				};
			default:
				return {
					paddingVertical: Spacing.sm + 2,
					paddingHorizontal: Spacing.lg,
				};
		}
	};

	const getTextColor = (): string => {
		if (variant === 'outline' || variant === 'ghost') {
			return disabled ? colors.textTertiary : colors.primary;
		}
		return colors.textInverse;
	};

	const getTextSize = (): number => {
		switch (size) {
			case 'small':
				return FontSizes.sm;
			case 'large':
				return FontSizes.lg;
			default:
				return FontSizes.md;
		}
	};

	return (
		<TouchableOpacity
			className={className}
			style={[getButtonStyle(), disabled && styles.disabled, style]}
			onPress={onPress}
			disabled={disabled || loading}
			activeOpacity={0.7}
		>
			{loading ? (
				<ActivityIndicator color={getTextColor()} size="small" />
			) : (
				<>
					{icon && <>{icon}</>}
					<Text
						style={[
							styles.text,
							{
								color: getTextColor(),
								fontSize: getTextSize(),
								marginLeft: icon ? Spacing.xs : 0,
							},
							textStyle,
						]}
					>
						{title}
					</Text>
				</>
			)}
		</TouchableOpacity>
	);
};

const styles = StyleSheet.create({
	base: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
		borderRadius: Radius.md,
	},
	text: {
		fontWeight: FontWeights.semibold,
	},
	disabled: {
		opacity: 0.5,
	},
});
