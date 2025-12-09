import React from 'react';
import { View } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { Container, Title, BodyText, Button } from '@/src/components/ui';
import { useAuthStore } from '@/src/core/stores/authStore';
import { Ionicons } from '@expo/vector-icons';

export default function RunnerTab() {
	const { isAuthenticated, user } = useAuthStore();
	const router = useRouter();

	if (!isAuthenticated) {
		return (
			<Container>
				<Stack.Screen options={{ title: 'Runner Dashboard' }} />
				<View
					style={{
						flex: 1,
						justifyContent: 'center',
						alignItems: 'center',
						padding: 24,
					}}
				>
					<Ionicons
						name="walk-outline"
						size={64}
						color="#999"
						style={{ marginBottom: 16 }}
					/>
					<Title style={{ textAlign: 'center', marginBottom: 8 }}>
						Become a Runner
					</Title>
					<BodyText
						style={{
							textAlign: 'center',
							color: '#666',
							marginBottom: 24,
						}}
					>
						Sign in to start earning money by completing tasks in
						your area
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
