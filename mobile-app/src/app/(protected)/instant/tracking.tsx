import React from 'react';
import { View } from 'react-native';
import { Stack, useLocalSearchParams } from 'expo-router';
import { Container, Card, Title, BodyText, Button } from '@/src/components/ui';
import { useInstantTaskStore } from '@/src/core/stores/instantTaskStore';
import { useWalletStore } from '@/src/core/stores/walletStore';

export default function TrackingScreen() {
	const { taskId } = useLocalSearchParams();
	const task = useInstantTaskStore((s) => s.getTaskById(taskId as string));
	const instantStore = useInstantTaskStore();
	const walletStore = useWalletStore();

	if (!task) {
		return (
			<Container>
				<Stack.Screen options={{ title: 'Tracking' }} />
				<BodyText>Task not found</BodyText>
			</Container>
		);
	}

	const handleConfirmReceipt = () => {
		// Mark task completed and release payments
		instantStore.completeTask(task.id);

		// Refund item price to runner (simulate)
		if (task.runnerId) {
			walletStore.addEarnings(
				task.runnerId,
				task.deliveryFee,
				task.id,
				'Delivery fare',
			);
			walletStore.addEarnings(
				task.runnerId,
				task.itemPrice,
				task.id,
				'Item reimbursement',
			);
		}

		// Release funds from user wallet
		walletStore.releaseFunds(task.userId, task.totalAmount, task.id);

		// Navigate back to orders
		// eslint-disable-next-line @typescript-eslint/no-floating-promises
		(async () => {})();
	};

	return (
		<Container>
			<Stack.Screen options={{ title: 'Delivery Tracking' }} />

			<Card>
				<Title>Delivery Status</Title>
				<BodyText style={{ marginTop: 8 }}>
					Status: {task.status}
				</BodyText>
				<BodyText style={{ marginTop: 4 }}>
					Total: ₦{task.totalAmount}
				</BodyText>

				{task.status !== 'completed' && (
					<Button
						title="Confirm Receipt & Release Payment"
						onPress={handleConfirmReceipt}
						fullWidth
						style={{ marginTop: 12 }}
					/>
				)}
			</Card>
		</Container>
	);
}
