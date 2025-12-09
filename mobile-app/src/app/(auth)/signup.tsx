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
import { mockSignup } from '@/src/core/api/authApi';
import { Colors } from '@/src/core/constants/theme';
import { useColorScheme } from '@/src/core/hooks/use-color-scheme';
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

	const colorScheme = useColorScheme();
	const colors = Colors[colorScheme ?? 'light'];

	return (
		<SafeAreaView spaced avoidKeyboard scrollable>
			{/* Header */}
			<View className="mb-8 mt-4">
				<Title>Create an account 🚀</Title>
				<Subtitle
					color={colors.textSecondary}
					className="text-base leading-6 mt-2"
				>
					Sign up to get started with Hustle
				</Subtitle>
			</View>

			{/* Signup Form */}
			<View className="mb-6">
				<Input
					label="Full name"
					placeholder="Jane Doe"
					autoCapitalize="words"
					value={name}
					onChangeText={setName}
				/>

				<Input
					label="Email"
					placeholder="you@example.com"
					keyboardType="email-address"
					autoCapitalize="none"
					value={email}
					onChangeText={setEmail}
				/>

				<Input
					label="Phone"
					placeholder="08012345678"
					keyboardType="phone-pad"
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

			{/* Login Link */}
			<View className="items-center pt-4">
				<View className="flex-row items-center">
					<Text className="text-base" style={{ color: colors.text }}>
						Already have an account?{' '}
					</Text>
					<TouchableOpacity
						onPress={() => router.push('/(auth)/login')}
					>
						<Text
							className="text-base font-bold"
							style={{ color: colors.primary }}
						>
							Login
						</Text>
					</TouchableOpacity>
				</View>
			</View>
		</SafeAreaView>
	);
}
