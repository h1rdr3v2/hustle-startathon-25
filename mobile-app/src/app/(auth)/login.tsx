import React, { useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { useRouter } from 'expo-router';
import {
	Button,
	Input,
	SafeAreaView,
	Subtitle,
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
			// @ts-ignore
			router.replace('/index');
		} else {
			alert(res.error || 'Login failed');
		}
	};

	const colorScheme = useColorScheme();
	const colors = Colors[colorScheme ?? 'light'];

	return (
		<SafeAreaView spaced avoidKeyboard scrollable>
			{/* Header */}
			<View className="mb-8 mt-4">
				<Title>Welcome back 👋</Title>
				<Subtitle
					color={colors.textSecondary}
					className="text-base leading-6 mt-2"
				>
					Login to continue using Hustle
				</Subtitle>
			</View>

			{/* Login Form */}
			<View className="mb-6">
				<Input
					label="Email"
					placeholder="you@example.com"
					keyboardType="email-address"
					autoCapitalize="none"
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

				<View className="flex-row justify-end mb-4">
					<TouchableOpacity
						onPress={() =>
							alert('Forgot password flow not implemented yet')
						}
						className="py-1"
					>
						<Text
							className="text-base font-semibold"
							style={{ color: colors.primary }}
						>
							Forgot password?
						</Text>
					</TouchableOpacity>
				</View>

				<Button
					title="Login"
					onPress={handleLogin}
					loading={loading}
					fullWidth
					size="large"
				/>
			</View>

			{/* Divider */}
			<View className="flex-row items-center mb-6">
				<View
					className="flex-1 h-[1px]"
					style={{ backgroundColor: colors.border }}
				/>
				<Text
					className="mx-4 text-sm"
					style={{ color: colors.textSecondary }}
				>
					Or continue with
				</Text>
				<View
					className="flex-1 h-[1px]"
					style={{ backgroundColor: colors.border }}
				/>
			</View>

			{/* Social Login */}
			<View className="gap-3 mb-6">
				<Button
					title="Continue with Google"
					variant="outline"
					onPress={() => alert('Social login not implemented')}
					fullWidth
				/>
				<Button
					title="Continue with Facebook"
					variant="outline"
					onPress={() => alert('Social login not implemented')}
					fullWidth
				/>
			</View>

			{/* Sign Up Link */}
			<View className="items-center pt-4">
				<View className="flex-row items-center">
					<Text className="text-base" style={{ color: colors.text }}>
						Don't have an account?{' '}
					</Text>
					<TouchableOpacity
						onPress={() => router.push('/(auth)/signup')}
					>
						<Text
							className="text-base font-bold"
							style={{ color: colors.primary }}
						>
							Sign up
						</Text>
					</TouchableOpacity>
				</View>
			</View>
		</SafeAreaView>
	);
}
