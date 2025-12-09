import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';

export default function TabsLayout() {
	return (
		<Tabs
			screenOptions={{
				headerShown: false,
			}}
		>
			<Tabs.Screen
				name="index"
				options={{
					title: 'Instant',
					tabBarIcon: ({ color, size }) => (
						<Ionicons name="flash" size={size} color={color} />
					),
				}}
			/>
			<Tabs.Screen
				name="custom"
				options={{
					title: 'Custom',
					tabBarIcon: ({ color, size }) => (
						<Ionicons name="create" size={size} color={color} />
					),
				}}
			/>
			<Tabs.Screen
				name="runner"
				options={{
					title: 'Runner',
					tabBarIcon: ({ color, size }) => (
						<Ionicons name="walk" size={size} color={color} />
					),
				}}
			/>
			<Tabs.Screen
				name="profile"
				options={{
					title: 'Profile',
					tabBarIcon: ({ color, size }) => (
						<Ionicons name="person" size={size} color={color} />
					),
				}}
			/>
		</Tabs>
	);
}
