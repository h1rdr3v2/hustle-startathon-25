import React from 'react';
import { View } from 'react-native';
import { useRouter } from 'expo-router';
import { BodyText, Button, Container, Title } from '@/src/components/ui';

export default function OnboardingScreen() {
	const router = useRouter();

	return (
		<Container>
			<View style={{ marginTop: 40 }}>
				<Title>Welcome to Hustle</Title>
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
