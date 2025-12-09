import React from 'react';
import { View } from 'react-native';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import { Container, Card, Title, BodyText, Button } from '@/src/components/ui';
import { useInstantTaskStore } from '@/src/core/stores/instantTaskStore';
import { useRunnerStore } from '@/src/core/stores/runnerStore';
import { useWalletStore } from '@/src/core/stores/walletStore';

export default function AssignedScreen() {
	const { taskId } = useLocalSearchParams();
	const task = useInstantTaskStore((s) => s.getTaskById(taskId as string));
	const router = useRouter();
	const runner = useRunnerStore((s) => s.getRunnerById(task?.runnerId || ''));
	const instantStore = useInstantTaskStore();
	const walletStore = useWalletStore();

	if (!task) {
		return (
			<Container>
				<Stack.Screen options={{ title: 'Assigned' }} />
				<BodyText>Task not found</BodyText>
			</Container>
		);
	}

	const simulateRunnerDeliver = () => {
		// Runner marks delivered
		instantStore.updateTaskStatus(task.id, 'delivered');
		router.push(`/(tabs)/instant/tracking?taskId=${task.id}`);
	};

	return (
		<Container>
			<Stack.Screen options={{ title: 'Runner Assigned' }} />

			<Card>
				<Title>Runner Assigned</Title>
				<BodyText style={{ marginTop: 8 }}>
					{runner?.name || 'Runner'}
				</BodyText>
				<BodyText style={{ marginTop: 4 }}>{runner?.phone}</BodyText>

				<Button
					title="Simulate Runner Deliver"
					onPress={simulateRunnerDeliver}
					fullWidth
					style={{ marginTop: 12 }}
				/>
			</Card>
		</Container>
	);
}
