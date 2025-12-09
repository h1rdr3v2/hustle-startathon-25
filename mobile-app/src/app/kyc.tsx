import React, { useState } from 'react';
import { View } from 'react-native';
import { useRouter } from 'expo-router';
import {
	BodyText,
	Button,
	Input,
	SafeAreaView,
	Title,
} from '@/src/components/ui';
import { useAuthStore } from '@/src/core/stores/authStore';

export default function KYCScreen() {
	const [idType, setIdType] = useState('National ID');
	const [idNumber, setIdNumber] = useState('');
	const [loading, setLoading] = useState(false);

	const router = useRouter();
	const { user, updateUser } = useAuthStore();

	const handleCompleteKYC = async () => {
		setLoading(true);
		// In a real app you'd send this to the backend. Here we mock completion.
		setTimeout(() => {
			updateUser({ kycCompleted: true });
			setLoading(false);
			// Redirect to profile after KYC
			router.replace('/profile');
		}, 900);
	};

	return (
		<SafeAreaView spaced scrollable>
			<View className="mt-6">
				<Title>Identity verification</Title>
				<BodyText style={{ marginTop: 8 }}>
					Help us confirm your identity. This is a quick, one-time
					process.
				</BodyText>

				<Input
					label="ID type"
					placeholder="National ID, Driver's License"
					value={idType}
					onChangeText={setIdType}
				/>
				<Input
					label="ID number"
					placeholder="Enter ID number"
					value={idNumber}
					onChangeText={setIdNumber}
				/>

				<BodyText style={{ marginTop: 12 }}>
					You can upload a photo of your ID in the next phase (mocked
					in this flow).
				</BodyText>

				<Button
					title="Complete KYC"
					onPress={handleCompleteKYC}
					loading={loading}
					fullWidth
					className="mt-4"
				/>
			</View>
		</SafeAreaView>
	);
}
