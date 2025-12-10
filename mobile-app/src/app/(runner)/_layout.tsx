import { Stack } from 'expo-router';

export default function RunnerLayout() {
	return (
		<Stack screenOptions={{ headerShown: false }}>
			<Stack.Screen name="dashboard" />
			<Stack.Screen name="available-tasks" />
			<Stack.Screen name="earnings" />
			<Stack.Screen name="settings" />
		</Stack>
	);
}
