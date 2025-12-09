import React from 'react';
import { View } from 'react-native';
import { Stack } from 'expo-router';
import { Container, Title, BodyText, Button } from '@/src/components/ui';
import { useRouter } from 'expo-router';

export default function OnboardingScreen() {
	const router = useRouter();

	return (
		<Container>
			<Stack.Screen options={{ headerShown: false }} />

			<View style={{ marginTop: 40 }}>
				<Title>Welcome to Ridely</Title>
				<BodyText style={{ marginTop: 8 }}>
					Instant errands and peer-to-peer delivery across Abia State
				</BodyText>

				<Button
					title="Get Started"
					onPress={() => router.replace('/(auth)/login')}
					fullWidth
					style={{ marginTop: 20 }}
				/>
			</View>
		</Container>
	);
}
