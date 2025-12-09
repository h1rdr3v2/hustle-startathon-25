/**
 * Ridely Design System
 * Comprehensive theme configuration for consistent UI across the app
 */

import { Platform } from 'react-native';

// ==================== BRAND COLORS ====================
const brandColors = {
	primary: '#0072ff', // Vibrant purple - primary brand color
	primaryDark: '#5548E0',
	primaryLight: '#8A84FF',

	secondary: '#FF6584', // Energetic pink - secondary accent
	secondaryDark: '#E05570',
	secondaryLight: '#FF8CA3',

	success: '#10B981', // Green for success states
	warning: '#F59E0B', // Amber for warnings
	error: '#EF4444', // Red for errors
	info: '#3B82F6', // Blue for info
};

// ==================== NEUTRAL COLORS ====================
const neutralColors = {
	black: '#000000',
	white: '#FFFFFF',

	gray50: '#F9FAFB',
	gray100: '#F3F4F6',
	gray200: '#E5E7EB',
	gray300: '#D1D5DB',
	gray400: '#9CA3AF',
	gray500: '#6B7280',
	gray600: '#4B5563',
	gray700: '#374151',
	gray800: '#1F2937',
	gray900: '#111827',
};

// ==================== COLOR SYSTEM ====================
export const Colors = {
	light: {
		// Brand
		primary: brandColors.primary,
		primaryDark: brandColors.primaryDark,
		primaryLight: brandColors.primaryLight,
		secondary: brandColors.secondary,

		// Status
		success: brandColors.success,
		warning: brandColors.warning,
		error: brandColors.error,
		info: brandColors.info,

		// Text
		text: neutralColors.gray900,
		textSecondary: neutralColors.gray600,
		textTertiary: neutralColors.gray500,
		textInverse: neutralColors.white,

		// Background
		background: neutralColors.white,
		backgroundSecondary: neutralColors.gray50,
		backgroundTertiary: neutralColors.gray100,

		// Surface
		surface: neutralColors.white,
		surfaceElevated: neutralColors.white,

		// Border
		border: neutralColors.gray200,
		borderLight: neutralColors.gray100,
		borderDark: neutralColors.gray300,

		// Icon
		icon: neutralColors.gray600,
		iconSecondary: neutralColors.gray400,

		// Tab bar
		tabIconDefault: neutralColors.gray400,
		tabIconSelected: brandColors.primary,
		tabBackground: neutralColors.white,

		// Card
		cardBackground: neutralColors.white,
		cardBorder: neutralColors.gray200,

		// Input
		inputBackground: neutralColors.white,
		inputBorder: neutralColors.gray300,
		inputPlaceholder: neutralColors.gray400,

		// Overlay
		overlay: 'rgba(0, 0, 0, 0.5)',
	},
	dark: {
		// Brand
		primary: brandColors.primaryLight,
		primaryDark: brandColors.primary,
		primaryLight: '#A39FFF',
		secondary: brandColors.secondaryLight,

		// Status
		success: '#34D399',
		warning: '#FBBF24',
		error: '#F87171',
		info: '#60A5FA',

		// Text
		text: neutralColors.gray50,
		textSecondary: neutralColors.gray300,
		textTertiary: neutralColors.gray400,
		textInverse: neutralColors.gray900,

		// Background
		background: neutralColors.gray900,
		backgroundSecondary: neutralColors.gray800,
		backgroundTertiary: neutralColors.gray700,

		// Surface
		surface: neutralColors.gray800,
		surfaceElevated: neutralColors.gray700,

		// Border
		border: neutralColors.gray700,
		borderLight: neutralColors.gray800,
		borderDark: neutralColors.gray600,

		// Icon
		icon: neutralColors.gray300,
		iconSecondary: neutralColors.gray500,

		// Tab bar
		tabIconDefault: neutralColors.gray500,
		tabIconSelected: brandColors.primaryLight,
		tabBackground: neutralColors.gray800,

		// Card
		cardBackground: neutralColors.gray800,
		cardBorder: neutralColors.gray700,

		// Input
		inputBackground: neutralColors.gray800,
		inputBorder: neutralColors.gray600,
		inputPlaceholder: neutralColors.gray500,

		// Overlay
		overlay: 'rgba(0, 0, 0, 0.7)',
	},
};

// ==================== SPACING ====================
export const Spacing = {
	xs: 4,
	sm: 8,
	md: 16,
	lg: 24,
	xl: 32,
	xxl: 48,
	xxxl: 64,
};

// ==================== BORDER RADIUS ====================
export const Radius = {
	xs: 4,
	sm: 8,
	md: 12,
	lg: 16,
	xl: 24,
	full: 9999,
};

// ==================== TYPOGRAPHY ====================
export const FontSizes = {
	xs: 12,
	sm: 14,
	md: 16,
	lg: 18,
	xl: 20,
	xxl: 24,
	xxxl: 32,
	huge: 40,
};

export const FontWeights = {
	regular: '400' as const,
	medium: '500' as const,
	semibold: '600' as const,
	bold: '700' as const,
};

export const LineHeights = {
	xs: 16,
	sm: 20,
	md: 24,
	lg: 28,
	xl: 32,
	xxl: 36,
	xxxl: 40,
	huge: 48,
};

export const Fonts = Platform.select({
	ios: {
		sans: 'system-ui',
		serif: 'ui-serif',
		rounded: 'ui-rounded',
		mono: 'ui-monospace',
	},
	default: {
		sans: 'normal',
		serif: 'serif',
		rounded: 'normal',
		mono: 'monospace',
	},
	web: {
		sans: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
		serif: "Georgia, 'Times New Roman', serif",
		rounded:
			"'SF Pro Rounded', 'Hiragino Maru Gothic ProN', Meiryo, 'MS PGothic', sans-serif",
		mono: "SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
	},
});

// ==================== SHADOWS ====================
export const Shadows = {
	sm: {
		shadowColor: '#000',
		shadowOffset: { width: 0, height: 1 },
		shadowOpacity: 0.05,
		shadowRadius: 2,
		elevation: 1,
	},
	md: {
		shadowColor: '#000',
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.1,
		shadowRadius: 4,
		elevation: 3,
	},
	lg: {
		shadowColor: '#000',
		shadowOffset: { width: 0, height: 4 },
		shadowOpacity: 0.15,
		shadowRadius: 8,
		elevation: 5,
	},
	xl: {
		shadowColor: '#000',
		shadowOffset: { width: 0, height: 8 },
		shadowOpacity: 0.2,
		shadowRadius: 16,
		elevation: 8,
	},
};

// ==================== LAYOUT ====================
export const Layout = {
	screenPadding: Spacing.md,
	maxContentWidth: 1200,
	tabBarHeight: 60,
	headerHeight: 56,
};

// ==================== ANIMATION ====================
export const Animation = {
	fast: 150,
	normal: 300,
	slow: 500,
};

// ==================== TASK STATUS COLORS ====================
export const TaskStatusColors = {
	open: '#3B82F6', // Blue
	assigned: '#8B5CF6', // Purple
	accepted: '#8B5CF6', // Purple
	in_progress: '#F59E0B', // Amber
	delivered: '#10B981', // Green
	awaiting_confirmation: '#06B6D4', // Cyan
	completed: '#10B981', // Green
	cancelled: '#EF4444', // Red
};

// ==================== EXPORT THEME OBJECT ====================
export const Theme = {
	colors: Colors,
	spacing: Spacing,
	radius: Radius,
	fonts: Fonts,
	fontSizes: FontSizes,
	fontWeights: FontWeights,
	lineHeights: LineHeights,
	shadows: Shadows,
	layout: Layout,
	animation: Animation,
	taskStatusColors: TaskStatusColors,
};
