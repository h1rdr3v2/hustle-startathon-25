import React, { useMemo, useState } from 'react';
import { View } from 'react-native';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import { BodyText, Button, Card, Container, Title } from '@/src/components/ui';
import { usePredefinedItem } from '@/src/core/hooks/useInstantTasks';
import { formatCurrency } from '@/src/core/utils/helpers';

export default function ItemDetailsScreen() {
	const { itemId } = useLocalSearchParams();
	const router = useRouter();
	const { data: item } = usePredefinedItem(itemId as string);

	if (!item) {
		return (
			<Container>
				<Stack.Screen options={{ title: 'Item' }} />
				<BodyText>Item not found</BodyText>
			</Container>
		);
	}

	return (
		<Container>
			<Stack.Screen options={{ title: item.name }} />

			<Card>
				<Title>{item.name}</Title>
				<BodyText style={{ marginTop: 8 }}>{item.description}</BodyText>
				<BodyText style={{ marginTop: 8 }}>
					{formatCurrency(item.price)}
				</BodyText>

				<Button
					title="Order Now"
					onPress={() =>
						router.push(
							`/(tabs)/instant/estimate?itemId=${item.id}`,
						)
					}
					fullWidth
					style={{ marginTop: 12 }}
				/>
			</Card>
		</Container>
	);
}
