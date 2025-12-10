import {
	DarkTheme,
	DefaultTheme,
	ThemeProvider,
} from '@react-navigation/native';
import { QueryClientProvider } from '@tanstack/react-query';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { queryClient } from '@/src/core/queryClient';
import 'react-native-reanimated';
import '../../global.css';
import { useColorScheme } from '@/src/core/hooks/use-color-scheme';

export default function RootLayout() {
	const colorScheme = useColorScheme();

	return (
		<QueryClientProvider client={queryClient}>
			<ThemeProvider
				value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}
			>
				<Stack screenOptions={{ headerShown: false }}>
					<Stack.Screen name="index" />
					<Stack.Screen name="confirmation" />
					<Stack.Screen name="location" />
					<Stack.Screen name="task-details" />
					<Stack.Screen name="runner-selection" />
					<Stack.Screen name="price-preview" />
					<Stack.Screen name="success" />
					<Stack.Screen name="profile" />
					<Stack.Screen name="kyc" />
					<Stack.Screen name="runner-application" />
					<Stack.Screen name="(runner)" />
				</Stack>
				<StatusBar style="auto" />
			</ThemeProvider>
		</QueryClientProvider>
	);
}
