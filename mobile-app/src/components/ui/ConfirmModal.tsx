import React from 'react';
import {
	Modal,
	Pressable,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
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
import { Button } from './Button';

interface ConfirmModalProps {
	visible: boolean;
	title: string;
	message: string;
	confirmText?: string;
	cancelText?: string;
	onConfirm: () => void;
	onCancel: () => void;
	loading?: boolean;
	variant?: 'primary' | 'danger';
}

export const ConfirmModal: React.FC<ConfirmModalProps> = ({
	visible,
	title,
	message,
	confirmText = 'Confirm',
	cancelText = 'Cancel',
	onConfirm,
	onCancel,
	loading = false,
	variant = 'primary',
}) => {
	const colorScheme = useColorScheme();
	const colors = Colors[colorScheme ?? 'light'];

	return (
		<Modal
			visible={visible}
			transparent
			animationType="fade"
			onRequestClose={onCancel}
		>
			<Pressable style={styles.overlay} onPress={onCancel}>
				<View style={styles.modalContainer}>
					<Pressable
						style={[
							styles.modalContent,
							{ backgroundColor: colors.background },
							Shadows.lg,
						]}
						onPress={(e) => e.stopPropagation()}
					>
						<Text style={[styles.title, { color: colors.text }]}>
							{title}
						</Text>
						<Text
							style={[
								styles.message,
								{ color: colors.textSecondary },
							]}
						>
							{message}
						</Text>

						<View style={styles.buttonContainer}>
							<Button
								title={cancelText}
								onPress={onCancel}
								variant="outline"
								style={styles.button}
								disabled={loading}
							/>
							<Button
								title={confirmText}
								onPress={onConfirm}
								variant={variant}
								style={styles.button}
								loading={loading}
								disabled={loading}
							/>
						</View>
					</Pressable>
				</View>
			</Pressable>
		</Modal>
	);
};

const styles = StyleSheet.create({
	overlay: {
		flex: 1,
		backgroundColor: 'rgba(0, 0, 0, 0.5)',
		justifyContent: 'center',
		alignItems: 'center',
	},
	modalContainer: {
		width: '100%',
		paddingHorizontal: Spacing.lg,
	},
	modalContent: {
		borderRadius: Radius.xl,
		padding: Spacing.xl,
	},
	title: {
		fontSize: FontSizes.xl,
		fontWeight: FontWeights.bold,
		marginBottom: Spacing.sm,
		textAlign: 'center',
	},
	message: {
		fontSize: FontSizes.md,
		lineHeight: 22,
		marginBottom: Spacing.xl,
		textAlign: 'center',
	},
	buttonContainer: {
		flexDirection: 'row',
		gap: Spacing.md,
	},
	button: {
		flex: 1,
	},
});
