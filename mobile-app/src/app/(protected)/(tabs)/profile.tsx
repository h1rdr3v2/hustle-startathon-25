import React from 'react';
import { Stack } from 'expo-router';
import { Container, Title, BodyText, Button } from '@/src/components/ui';
import { useAuthStore } from '@/src/core/stores/authStore';
import { useRouter } from 'expo-router';

export default function ProfileTab() {
	const user = useAuthStore((s) => s.user);
	const logout = useAuthStore((s) => s.logout);
	const router = useRouter();

	const handleLogout = () => {
		logout();
		router.replace('/(auth)/login');
	};

	return (
		<Container>
			<Stack.Screen options={{ title: 'Profile' }} />

			<Title>{user?.name || 'Guest'}</Title>
			<BodyText style={{ marginTop: 8 }}>
				{user?.email || 'Not signed in'}
			</BodyText>

			<Button
				title="Logout"
				onPress={handleLogout}
				variant="outline"
				fullWidth
				style={{ marginTop: 16 }}
			/>
		</Container>
	);
}
