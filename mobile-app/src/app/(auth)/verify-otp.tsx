import React, { useState } from 'react';
import { View } from 'react-native';
import { useRouter } from 'expo-router';
import { BodyText, Button, Container, Input, Title } from '@/src/components/ui';
import { mockVerifyOTP } from '@/src/core/api/authApi';

export default function VerifyOTPScreen() {
	const [code, setCode] = useState('');
	const [loading, setLoading] = useState(false);
	const router = useRouter();

	const handleVerify = async () => {
		setLoading(true);
		const res = await mockVerifyOTP({ phone: 'unknown', code });
		setLoading(false);

		if (res.success) {
			// After OTP verified go to profile setup or main app
			router.replace('/(screens)/(tabs)');
		} else {
			alert(res.error || 'Invalid OTP');
		}
	};

	return (
		<Container>
			<View style={{ marginTop: 40 }}>
				<Title>Enter OTP</Title>
				<BodyText style={{ marginTop: 8 }}>
					Enter the 6-digit code sent to your phone
				</BodyText>

				<Input
					label="OTP Code"
					placeholder="123456"
					value={code}
					onChangeText={setCode}
				/>

				<Button
					title="Verify"
					onPress={handleVerify}
					loading={loading}
					fullWidth
				/>
			</View>
		</Container>
	);
}
