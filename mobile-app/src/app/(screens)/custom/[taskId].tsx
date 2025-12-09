import React from 'react';
import { View } from 'react-native';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import { Container, Card, Title, BodyText, Button } from '@/src/components/ui';
import { useCustomTaskStore } from '@/src/core/stores/customTaskStore';
import { useAuthStore } from '@/src/core/stores/authStore';
import { useAcceptCustomTask } from '@/src/core/hooks/useCustomTasks';

export default function TaskDetailScreen() {
	const { taskId } = useLocalSearchParams();
	const router = useRouter();
	const task = useCustomTaskStore((s) => s.getTaskById(taskId as string));
	const user = useAuthStore((s) => s.user);
	const acceptMutation = useAcceptCustomTask();

	if (!task) {
		return (
			<Container>
				<Stack.Screen options={{ title: 'Task' }} />
				<BodyText>Task not found</BodyText>
			</Container>
		);
	}

	const handleAccept = async () => {
		if (!user) return router.push('/(auth)/login');

		try {
			await acceptMutation.mutateAsync({
				taskId: task.id,
				runnerId: user.id,
			});
			// update local store
			useCustomTaskStore.getState().acceptTask(task.id, user.id);
			router.push('/(tabs)/runner');
		} catch (err) {
			alert('Failed to accept task');
		}
	};

	return (
		<Container>
			<Stack.Screen options={{ title: task.title }} />

			<Card>
				<Title>{task.title}</Title>
				<BodyText style={{ marginTop: 8 }}>{task.description}</BodyText>
				<BodyText style={{ marginTop: 8 }}>
					Budget: ₦{task.budget}
				</BodyText>
				<BodyText style={{ marginTop: 4 }}>
					Pickup: {task.pickupLocation?.address}
				</BodyText>
				<BodyText style={{ marginTop: 2 }}>
					Delivery: {task.deliveryLocation?.address}
				</BodyText>

				{user?.role === 'runner' && task.status === 'open' && (
					<Button
						title="Accept Task"
						onPress={handleAccept}
						fullWidth
						style={{ marginTop: 12 }}
					/>
				)}

				{user?.id === task.userId && (
					<Button
						title="Edit"
						onPress={() => {}}
						variant="outline"
						fullWidth
						style={{ marginTop: 12 }}
					/>
				)}
			</Card>
		</Container>
	);
}
