import React from 'react';
import { View, FlatList, TouchableOpacity } from 'react-native';
import { Stack } from 'expo-router';
import { Container, Card, Title, BodyText, Button } from '@/src/components/ui';
import { usePredefinedItems } from '@/src/core/hooks/useItems';
import { formatCurrency } from '@/src/core/utils/helpers';
import { useRouter } from 'expo-router';

export default function InstantTab() {
	const { data: items = [], isLoading } = usePredefinedItems();
	const router = useRouter();

	return (
		<Container>
			<Stack.Screen options={{ title: 'Instant Tasks' }} />

			<FlatList
				data={items}
				keyExtractor={(i) => i.id}
				renderItem={({ item }) => (
					<Card style={{ marginBottom: 12 }}>
						<Title>{item.name}</Title>
						<BodyText style={{ marginTop: 4 }}>
							{item.description}
						</BodyText>
						<BodyText style={{ marginTop: 8 }}>
							{formatCurrency(item.price)}
						</BodyText>
						<Button
							title="Order"
							onPress={() =>
								router.push(`/(tabs)/instant/${item.id}`)
							}
							fullWidth
							style={{ marginTop: 8 }}
						/>
					</Card>
				)}
			/>
		</Container>
	);
}
