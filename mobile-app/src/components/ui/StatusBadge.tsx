import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import {
	TaskStatusColors,
	Spacing,
	Radius,
	FontSizes,
} from '@/src/core/constants/theme';
import { Caption } from './Typography';
import { InstantTaskStatus, CustomTaskStatus } from '@/src/core/types';

interface StatusBadgeProps {
	status: InstantTaskStatus | CustomTaskStatus;
	style?: ViewStyle;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status, style }) => {
	const getStatusColor = () => {
		return TaskStatusColors[status] || TaskStatusColors.open;
	};

	const getStatusLabel = () => {
		return status
			.split('_')
			.map((word) => word.charAt(0).toUpperCase() + word.slice(1))
			.join(' ');
	};

	const backgroundColor = getStatusColor();
	const textColor = '#FFFFFF';

	return (
		<View style={[styles.container, { backgroundColor }, style]}>
			<Caption color={textColor} style={styles.text}>
				{getStatusLabel()}
			</Caption>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		paddingHorizontal: Spacing.sm + 2,
		paddingVertical: Spacing.xs,
		borderRadius: Radius.full,
		alignSelf: 'flex-start',
	},
	text: {
		fontSize: FontSizes.xs,
		fontWeight: '600',
	},
});
