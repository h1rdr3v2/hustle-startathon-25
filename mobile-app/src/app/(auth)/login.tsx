import { View } from 'react-native';
import React, { useState } from 'react';
import { useRouter } from 'expo-router';
import { useAuthStore } from '@/src/core/stores/authStore';
import { mockLogin, mockSendOTP } from '@/src/core/api/authApi';
import { Input, Button, Container, Title, BodyText } from '@/src/components/ui';

export default function LoginScreen() {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [loading, setLoading] = useState(false);
	const setAuth = useAuthStore((s) => s.setAuth);
	const router = useRouter();

	const handleLogin = async () => {
		setLoading(true);
		const res = await mockLogin({ email, password });
		setLoading(false);

		if (res.success && res.data) {
			setAuth(res.data.user, res.data.token);
			router.replace('/(screens)/(tabs)');
		} else {
			alert(res.error || 'Login failed');
		}
	};

	const handleSendOTP = async () => {
		if (!email) return alert('Enter an email or phone');
		setLoading(true);
		const res = await mockSendOTP(email);
		setLoading(false);

		if (res.success) {
			router.push('/(auth)/verify-otp');
		} else {
			alert(res.error || 'Failed to send OTP');
		}
	};

	return (
		<Container>
			<View style={{ marginTop: 40 }}>
				<Title>Welcome back</Title>
				<BodyText style={{ marginTop: 8 }}>
					Login to continue using Hustle
				</BodyText>

				<Input
					label="Email"
					placeholder="you@example.com"
					value={email}
					onChangeText={setEmail}
				/>

				<Input
					label="Password"
					placeholder="Enter your password"
					secureTextEntry
					value={password}
					onChangeText={setPassword}
				/>

				<Button
					title="Login"
					onPress={handleLogin}
					loading={loading}
					fullWidth
				/>
				<Button
					title="Login with OTP"
					onPress={handleSendOTP}
					variant="outline"
					fullWidth
					style={{ marginTop: 12 }}
				/>
			</View>
		</Container>
	);
}
