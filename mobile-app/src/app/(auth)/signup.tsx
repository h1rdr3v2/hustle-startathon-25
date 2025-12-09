import React, { useState } from 'react';
import { View } from 'react-native';
import { useRouter } from 'expo-router';
import { BodyText, Button, Container, Input, Title } from '@/src/components/ui';
import { mockSignup } from '@/src/core/api/authApi';
import { useAuthStore } from '@/src/core/stores/authStore';

export default function SignupScreen() {
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [phone, setPhone] = useState('');
	const [password, setPassword] = useState('');
	const [loading, setLoading] = useState(false);

	const setAuth = useAuthStore((s) => s.setAuth);
	const router = useRouter();

	const handleSignup = async () => {
		setLoading(true);
		const res = await mockSignup({
			name,
			email,
			phone,
			password,
			role: 'user',
		});
		setLoading(false);

		if (res.success && res.data) {
			// set auth and send user to KYC flow
			setAuth(res.data.user, res.data.token);
			router.replace('/kyc');
		} else {
			alert(res.error || 'Signup failed');
		}
	};

	return (
		<Container>
			<View style={{ marginTop: 40 }}>
				<Title>Create an account</Title>
				<BodyText style={{ marginTop: 8 }}>
					Sign up to get started with Hustle
				</BodyText>

				<Input
					label="Full name"
					placeholder="Jane Doe"
					value={name}
					onChangeText={setName}
				/>
				<Input
					label="Email"
					placeholder="you@example.com"
					value={email}
					onChangeText={setEmail}
				/>
				<Input
					label="Phone"
					placeholder="08012345678"
					value={phone}
					onChangeText={setPhone}
				/>
				<Input
					label="Password"
					placeholder="Create a password"
					secureTextEntry
					value={password}
					onChangeText={setPassword}
				/>

				<Button
					title="Create account"
					onPress={handleSignup}
					loading={loading}
					fullWidth
				/>
			</View>
		</Container>
	);
}
