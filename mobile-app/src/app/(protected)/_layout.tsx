import { Redirect, Stack } from 'expo-router';
// import { authStore } from '@/core/stores/authStore';

export default function ProtectedLayout() {
	// const { isLoggedIn } = authStore();
	//
	// if (!isLoggedIn()) {
	// 	return <Redirect href="/login" />;
	// }

	return (
		<Stack>
			<Stack.Screen
				name="(tabs)"
				options={{ headerShown: false, headerBackVisible: false }}
			/>
		</Stack>
	);
}
