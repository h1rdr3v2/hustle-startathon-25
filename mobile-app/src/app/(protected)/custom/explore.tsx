import React from 'react';
import { FlatList } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { Container, Card, Title, BodyText, Button } from '@/src/components/ui';
import { useOpenCustomTasks } from '@/src/core/hooks/useCustomTasks';

export default function ExploreTasksScreen() {
	const router = useRouter();
	const { data: paginated } = useOpenCustomTasks();
	const tasks = (paginated && (paginated as any).data) || [];

	return (
		<Container scrollable>
			<Stack.Screen options={{ title: 'Explore Tasks' }} />

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
						<Button
							title="View"
							onPress={() =>
								router.push(`/(tabs)/custom/${item.id}`)
							}
							fullWidth
							style={{ marginTop: 8 }}
						/>
					</Card>
				)}
			/>
		</Container>
	);
}
