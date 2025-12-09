import React from 'react';
import { View } from 'react-native';
import { Stack } from 'expo-router';
import { Container, Title, BodyText, Button } from '@/src/components/ui';

export default function RunnerTab() {
	return (
		<Container>
			<Stack.Screen options={{ title: 'Runner Dashboard' }} />

			<Title>Runner Mode</Title>
			<BodyText style={{ marginTop: 8 }}>
				See assigned tasks and accept new ones
			</BodyText>
			<Button
				title="Go Available"
				onPress={() => {}}
				fullWidth
				style={{ marginTop: 12 }}
			/>
		</Container>
	);
}
