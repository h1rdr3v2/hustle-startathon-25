import React from 'react';
import { View, FlatList } from 'react-native';
import { Stack } from 'expo-router';
import { Container, Card, Title, BodyText, Button } from '@/src/components/ui';

export default function CustomTab() {
	// For now show a placeholder and a button to create task
	return (
		<Container>
			<Stack.Screen options={{ title: 'Custom Tasks' }} />

			<Card>
				<Title>Create a custom task</Title>
				<BodyText style={{ marginTop: 8 }}>
					Post errands and get student runners to complete them
				</BodyText>
				<Button
					title="Create Task"
					onPress={() => {}}
					fullWidth
					style={{ marginTop: 12 }}
				/>
			</Card>
		</Container>
	);
}
