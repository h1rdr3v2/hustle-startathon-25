import {
	DarkTheme,
	DefaultTheme,
	ThemeProvider,
} from '@react-navigation/native';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from '@/src/core/queryClient';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';

import { useColorScheme } from '@/src/core/hooks/use-color-scheme';

export default function RootLayout() {
	const colorScheme = useColorScheme();

	return (
		<QueryClientProvider client={queryClient}>
			<ThemeProvider
				value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}
			>
				<Stack screenOptions={{ headerShown: false }}>
					<Stack.Screen name="(protected)" />
				</Stack>
				<StatusBar style="auto" />
			</ThemeProvider>
		</QueryClientProvider>
	);
}
