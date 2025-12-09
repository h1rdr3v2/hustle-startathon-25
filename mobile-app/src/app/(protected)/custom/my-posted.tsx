import React from 'react';
import { FlatList } from 'react-native';
import { Stack } from 'expo-router';
import { Container, Card, Title, BodyText, Button } from '@/src/components/ui';
import { useAuthStore } from '@/src/core/stores/authStore';
import { useCustomTaskStore } from '@/src/core/stores/customTaskStore';

export default function MyPostedTasksScreen() {
	const user = useAuthStore((s) => s.user);
	const tasks = useCustomTaskStore((s) => s.getUserTasks(user?.id || ''));

	return (
		<Container scrollable>
			<Stack.Screen options={{ title: 'My Posted Tasks' }} />

			<FlatList
				data={tasks}
				keyExtractor={(t: any) => t.id}
				renderItem={({ item }: any) => (
					<Card style={{ marginBottom: 12 }}>
						<Title>{item.title}</Title>
						<BodyText style={{ marginTop: 8 }}>
							{item.description}
						</BodyText>
						<BodyText style={{ marginTop: 8 }}>
							Budget: ₦{item.budget}
						</BodyText>
						<BodyText style={{ marginTop: 6 }}>
							Status: {item.status}
						</BodyText>
						<Button
							title="View"
							onPress={() => {}}
							fullWidth
							style={{ marginTop: 8 }}
						/>
					</Card>
				)}
			/>
		</Container>
	);
}
