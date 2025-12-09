import React, { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useRouter } from 'expo-router';
import {
	BodyText,
	Button,
	Input,
	SafeAreaView,
	Title,
} from '@/src/components/ui';
import { mockLogin } from '@/src/core/api/authApi';
import { Colors } from '@/src/core/constants/theme';
import { useColorScheme } from '@/src/core/hooks/use-color-scheme';
import { useAuthStore } from '@/src/core/stores/authStore';

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
			router.replace('/');
		} else {
			alert(res.error || 'Login failed');
		}
	};

	const colorScheme = useColorScheme();
	const colors = Colors[colorScheme ?? 'light'];

	return (
		<SafeAreaView
			spaced
			avoidKeyboard
			scrollable
			style={{ backgroundColor: colors.background, paddingInline: 4 }}
		>
			<View>
				<Title>Welcome back</Title>
				<BodyText style={{ marginTop: 8, marginBottom: 12 }}>
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

				<View style={styles.rowBetween}>
					<Pressable
						onPress={() =>
							alert('Forgot password flow not implemented yet')
						}
					>
						<Text
							style={{
								color: colors.primary,
								fontWeight: '600',
							}}
						>
							Forgot password?
						</Text>
					</Pressable>
				</View>

				<Button
					title="Login"
					onPress={handleLogin}
					loading={loading}
					fullWidth
				/>

				<View style={{ marginTop: 14 }}>
					<BodyText align="center" style={{ marginBottom: 10 }}>
						Or continue with
					</BodyText>
					<Button
						title="Continue with Google"
						variant="outline"
						onPress={() => alert('Social login not implemented')}
						fullWidth
					/>
					<View style={{ height: 10 }} />
					<Button
						title="Continue with Facebook"
						variant="outline"
						onPress={() => alert('Social login not implemented')}
						fullWidth
					/>
				</View>

				<View style={{ marginTop: 18, alignItems: 'center' }}>
					<BodyText>
						Don’t have an account?{' '}
						<Pressable onPress={() => router.push('/signup')}>
							<Text
								style={{
									color: colors.primary,
									fontWeight: '700',
								}}
							>
								Create one
							</Text>
						</Pressable>
					</BodyText>
				</View>
			</View>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	outer: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		width: '100%',
		paddingHorizontal: 12,
	},
	rowBetween: {
		width: '100%',
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		marginVertical: 8,
	},
});
