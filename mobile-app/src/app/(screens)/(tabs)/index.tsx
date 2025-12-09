import React from 'react';
import { FlatList } from 'react-native';
import { useRouter } from 'expo-router';
import { BodyText, Button, Card, Container, Title } from '@/src/components/ui';
import { usePredefinedItems } from '@/src/core/hooks/useItems';
import { useAuthStore } from '@/src/core/stores/authStore';
import { formatCurrency } from '@/src/core/utils/helpers';

export default function InstantTab() {
	const { data: items = [], isLoading } = usePredefinedItems();
	const { isAuthenticated } = useAuthStore();
	const router = useRouter();

	const handleOrder = (itemId: string) => {
		if (!isAuthenticated) {
			router.push('/(auth)/login');
			return;
		}
		router.push(`/(screens)/instant/${itemId}`);
	};

	return (
		<Container>
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
							title={
								isAuthenticated ? 'Order' : 'Sign In to Order'
							}
							onPress={() => handleOrder(item.id)}
							fullWidth
							style={{ marginTop: 8 }}
						/>
					</Card>
				)}
			/>
		</Container>
	);
}
