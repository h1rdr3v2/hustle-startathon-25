import React from 'react';
import { Tabs } from 'expo-router';
import { Text } from 'react-native';

export default function TabsLayout() {
	return (
		<Tabs>
			<Tabs.Screen name="index" options={{ title: 'Instant' }} />
			<Tabs.Screen name="custom" options={{ title: 'Custom' }} />
			<Tabs.Screen name="runner" options={{ title: 'Runner' }} />
			<Tabs.Screen name="profile" options={{ title: 'Profile' }} />
		</Tabs>
	);
}
