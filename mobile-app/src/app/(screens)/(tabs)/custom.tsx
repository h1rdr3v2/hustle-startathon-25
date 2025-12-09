import React from 'react';
import { View, FlatList } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { Container, Card, Title, BodyText, Button } from '@/src/components/ui';
import { useAuthStore } from '@/src/core/stores/authStore';
import { Ionicons } from '@expo/vector-icons';

export default function CustomTab() {
	const { isAuthenticated } = useAuthStore();
	const router = useRouter();

	if (!isAuthenticated) {
		return (
			<Container>
				<Stack.Screen options={{ title: 'Custom Tasks' }} />
				<View
					style={{
						flex: 1,
						justifyContent: 'center',
						alignItems: 'center',
						padding: 24,
					}}
				>
					<Ionicons
						name="lock-closed-outline"
						size={64}
						color="#999"
						style={{ marginBottom: 16 }}
					/>
					<Title style={{ textAlign: 'center', marginBottom: 8 }}>
						Sign In Required
					</Title>
					<BodyText
						style={{
							textAlign: 'center',
							color: '#666',
							marginBottom: 24,
						}}
					>
						Please sign in to create and manage custom tasks
					</BodyText>
					<Button
						title="Sign In"
						onPress={() => router.push('/(auth)/login')}
						fullWidth
					/>
				</View>
			</Container>
		);
	}

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
