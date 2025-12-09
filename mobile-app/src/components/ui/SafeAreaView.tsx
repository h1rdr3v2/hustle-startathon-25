import React, { ReactNode } from 'react';
import {
	KeyboardAvoidingView,
	Platform,
	RefreshControl,
	ScrollView,
	StatusBar,
	View,
	ViewProps,
} from 'react-native';
import { useHeaderHeight } from '@react-navigation/elements';
import { LinearGradient, LinearGradientProps } from 'expo-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface SafeAreaViewProps extends ViewProps {
	children?: ReactNode;
	avoidKeyboard?: boolean;
	scrollable?: boolean;
	spaced?: boolean;
	bounces?: boolean;
	scrollProps?: React.ComponentProps<typeof ScrollView>;
	refreshing?: boolean;
	onRefresh?: () => void;
	refreshColors?: string[]; // Android
	tintColor?: string; // iOS
	ignoreHeaderPadding?: boolean;
	ignoreAllHeaderPadding?: boolean;
	grow?: boolean;
	gradient?: Omit<LinearGradientProps, 'style'>;
}

export const SafeAreaView: React.FC<SafeAreaViewProps> = ({
	children,
	className = '',
	style,
	avoidKeyboard = false,
	scrollable = false,
	spaced = false,
	bounces = true,
	scrollProps,
	refreshing,
	onRefresh,
	refreshColors,
	tintColor,
	ignoreHeaderPadding,
	ignoreAllHeaderPadding = false,
	grow,
	gradient,
	...props
}) => {
	const headerHeight = useHeaderHeight();
	const { top } = useSafeAreaInsets();
	const statusBarHeight =
		Platform.OS === 'android' ? (StatusBar.currentHeight ?? 0) : 0;

	const safeHeight = ignoreAllHeaderPadding
		? 0
		: ignoreHeaderPadding || headerHeight === 0
			? top - statusBarHeight
			: headerHeight - statusBarHeight;

	const innerContentClasses = [
		'flex-1 pt-2 ios:pb-safe-offset-32 android:pb-safe max-w-screen-lg w-full self-center',
		spaced ? 'px-4' : '',
	]
		.filter(Boolean)
		.join(' ')
		.trim();

	// Inner content (for non-scrollable screens)
	const innerContent = (
		<View className={innerContentClasses}>{children}</View>
	);

	// Scrollable content (ScrollView + RefreshControl + innerContent)
	const scrollableContent = (
		<ScrollView
			style={{ flex: 1 }}
			bounces={bounces}
			keyboardShouldPersistTaps="handled"
			showsVerticalScrollIndicator={false}
			contentInset={
				Platform.OS === 'ios' ? { top: safeHeight } : undefined
			}
			contentOffset={
				Platform.OS === 'ios' ? { x: 0, y: -safeHeight } : undefined
			}
			contentContainerStyle={{
				flexGrow: grow ? 1 : 0,
				paddingTop: Platform.OS === 'android' ? safeHeight : 0,
			}}
			refreshControl={
				onRefresh ? (
					<RefreshControl
						refreshing={refreshing ?? false}
						onRefresh={onRefresh}
						colors={refreshColors} // Android
						tintColor={tintColor} // iOS
					/>
				) : undefined
			}
			{...scrollProps}
		>
			{innerContent}
		</ScrollView>
	);

	const content = scrollable ? scrollableContent : innerContent;

	const wrapped = avoidKeyboard ? (
		<KeyboardAvoidingView
			style={{ flex: 1 }}
			behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
		>
			{content}
		</KeyboardAvoidingView>
	) : (
		content
	);

	return (
		<View
			className={`flex-1 ${!gradient ? 'bg-background-light dark:bg-background-dark' : ''} ${className}`}
			style={[
				{
					paddingTop:
						Platform.OS === 'android' ? StatusBar.currentHeight : 0,
				},
				style,
			]}
			{...props}
		>
			{gradient && (
				<LinearGradient
					{...gradient}
					style={{
						position: 'absolute',
						top: 0,
						left: 0,
						right: 0,
						bottom: 0,
					}}
				/>
			)}
			{wrapped}
		</View>
	);
};

export default SafeAreaView;
