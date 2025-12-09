import React, { useMemo, useState } from 'react';
import { View } from 'react-native';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import {
	Container,
	Card,
	Title,
	BodyText,
	Button,
	LoadingSpinner,
} from '@/src/components/ui';
import {
	usePredefinedItem,
	useCreateInstantTask,
} from '@/src/core/hooks/useInstantTasks';
import { useAvailableRunners } from '@/src/core/hooks/useRunners';
import { useAuthStore } from '@/src/core/stores/authStore';
import { useWalletStore } from '@/src/core/stores/walletStore';
import {
	calculateDistance,
	calculateFare,
	generateId,
	formatCurrency,
} from '@/src/core/utils/helpers';

export default function EstimateScreen() {
	const { itemId } = useLocalSearchParams();
	const router = useRouter();
	const { data: item } = usePredefinedItem(
		itemId as string | undefined as any,
	);
	const { data: availableRunners = [] } = useAvailableRunners();
	const createInstantTask = useCreateInstantTask(availableRunners);
	const user = useAuthStore((s) => s.user);
	const walletStore = useWalletStore();

	const [loading, setLoading] = useState(false);

	const pickupLocation = item
		? { latitude: 0, longitude: 0, address: 'Vendor', city: 'Umuahia' }
		: undefined;

	const distance = useMemo(() => {
		if (!item || !user?.location) return 0;
		// For mock, use vendor location near Umuahia center
		const vendorLoc = user.location; // simplified: assume vendor is near user for mock
		return calculateDistance(vendorLoc, user.location);
	}, [item, user]);

	const fareResult = useMemo(() => {
		return calculateFare(distance);
	}, [distance]);

	if (!item) {
		return (
			<Container>
				<Stack.Screen options={{ title: 'Estimate' }} />
				<BodyText>Item not found</BodyText>
			</Container>
		);
	}

	const totalAmount = item.price + fareResult.totalFare;

	const handleConfirm = async () => {
		if (!user) return router.push('/(auth)/login');

		setLoading(true);

		// ensure wallets exist
		walletStore.initializeWallet(user.id);

		const lockId = generateId('lock');
		const locked = walletStore.lockFunds(
			user.id,
			totalAmount,
			lockId,
			'instant_lock',
		);

		if (!locked) {
			setLoading(false);
			alert('Insufficient funds. Please top up your wallet (mock).');
			return;
		}

		// create instant task
		const payload = {
			userId: user.id,
			itemId: item.id,
			vendorId: item.vendorId,
			pickupLocation: user.location!,
			deliveryLocation: user.location!,
			itemPrice: item.price,
			deliveryFee: fareResult.totalFare,
			totalAmount: totalAmount,
			userPhone: user.phone,
			specialInstructions: '',
		};

		try {
			const res = await createInstantTask.mutateAsync(payload as any);
			setLoading(false);

			if (res?.task) {
				// navigate to assigned screen
				router.push(`/(tabs)/instant/assigned?taskId=${res.task.id}`);
			} else {
				alert('Failed to create task');
			}
		} catch (err) {
			setLoading(false);
			alert('Failed to create task');
		}
	};

	return (
		<Container>
			<Stack.Screen options={{ title: 'Fare Estimate' }} />

			<Card>
				<Title>{item.name}</Title>
				<BodyText style={{ marginTop: 8 }}>{item.description}</BodyText>
				<BodyText style={{ marginTop: 12 }}>
					Item: {formatCurrency(item.price)}
				</BodyText>
				<BodyText style={{ marginTop: 4 }}>
					Delivery fee: {formatCurrency(fareResult.totalFare)}
				</BodyText>
				<BodyText style={{ marginTop: 4, fontWeight: '600' }}>
					Total: {formatCurrency(totalAmount)}
				</BodyText>

				<Button
					title="Confirm & Lock Funds"
					onPress={handleConfirm}
					loading={loading}
					fullWidth
					style={{ marginTop: 12 }}
				/>
			</Card>
		</Container>
	);
}
