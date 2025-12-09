import { Stack } from 'expo-router';

export default function CustomScreensLayout() {
	return (
		<Stack screenOptions={{ headerShown: true, headerBackTitle: 'Back' }}>
			<Stack.Screen name="create" />
		</Stack>
	);
}
