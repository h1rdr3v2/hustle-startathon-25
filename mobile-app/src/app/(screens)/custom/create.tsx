import React, { useState } from 'react';
import { View } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import {
	Container,
	Card,
	Title,
	BodyText,
	Input,
	Button,
} from '@/src/components/ui';
import { useCreateCustomTask } from '@/src/core/hooks/useCustomTasks';
import { useAuthStore } from '@/src/core/stores/authStore';
import { useWalletStore } from '@/src/core/stores/walletStore';
import { useCustomTaskStore } from '@/src/core/stores/customTaskStore';
import { generateId } from '@/src/core/utils/helpers';

export default function CreateTaskScreen() {
	const router = useRouter();
	const user = useAuthStore((s) => s.user);
	const walletStore = useWalletStore();
	const createMutation = useCreateCustomTask();

	const [title, setTitle] = useState('');
	const [description, setDescription] = useState('');
	const [category, setCategory] = useState('other');
	const [budget, setBudget] = useState('1000');
	const [pickupAddress, setPickupAddress] = useState('');
	const [deliveryAddress, setDeliveryAddress] = useState('');
	const [estimatedMinutes, setEstimatedMinutes] = useState('30');
	const [loading, setLoading] = useState(false);

	const handleCreate = async () => {
		if (!user) return router.push('/(auth)/login');

		const amount = Number(budget || 0);
		if (amount <= 0) return alert('Set a valid budget');

		// Initialize wallet and lock funds
		walletStore.initializeWallet(user.id);
		const lockId = generateId('lock');
		const locked = walletStore.lockFunds(
			user.id,
			amount,
			lockId,
			'task_lock',
		);

		if (!locked) return alert('Insufficient funds (mock). Top up wallet.');

		setLoading(true);

		try {
			const payload = {
				userId: user.id,
				title,
				description,
				category,
				budget: amount,
				estimatedDuration: Number(estimatedMinutes),
				pickupLocation: {
					latitude: user.location?.latitude || 0,
					longitude: user.location?.longitude || 0,
					address:
						pickupAddress || user.location?.address || 'Unknown',
					city: user.location?.city || 'Umuahia',
				},
				deliveryLocation: {
					latitude: user.location?.latitude || 0,
					longitude: user.location?.longitude || 0,
					address:
						deliveryAddress || user.location?.address || 'Unknown',
					city: user.location?.city || 'Umuahia',
				},
				userPhone: user.phone,
				userEmail: user.email,
			} as any;

			const res = await createMutation.mutateAsync(payload);
			setLoading(false);

			if (res) {
				// add to local custom task store for immediate UX
				useCustomTaskStore.getState().addTask(res as any);
				router.push('/(tabs)/custom/my-posted');
			} else {
				alert('Failed to create task');
			}
		} catch (err) {
			setLoading(false);
			alert('Failed to create task');
		}
	};

	return (
		<Container scrollable>
			<Stack.Screen options={{ title: 'Create Task' }} />

			<Card>
				<Title>Create a Custom Task</Title>
				<BodyText style={{ marginTop: 8 }}>
					Describe your errand and set a budget
				</BodyText>

				<Input
					label="Title"
					placeholder="Buy airtime"
					value={title}
					onChangeText={setTitle}
				/>
				<Input
					label="Description"
					placeholder="Details for the runner"
					value={description}
					onChangeText={setDescription}
				/>
				<Input
					label="Category"
					placeholder="shopping|pickup|delivery|school_errand"
					value={category}
					onChangeText={setCategory}
				/>
				<Input
					label="Budget (₦)"
					placeholder="1000"
					keyboardType="numeric"
					value={budget}
					onChangeText={setBudget}
				/>
				<Input
					label="Pickup address"
					placeholder="Pickup location"
					value={pickupAddress}
					onChangeText={setPickupAddress}
				/>
				<Input
					label="Delivery address"
					placeholder="Delivery location"
					value={deliveryAddress}
					onChangeText={setDeliveryAddress}
				/>
				<Input
					label="Estimated time (minutes)"
					placeholder="30"
					keyboardType="numeric"
					value={estimatedMinutes}
					onChangeText={setEstimatedMinutes}
				/>

				<Button
					title="Post Task (Lock Funds)"
					onPress={handleCreate}
					loading={loading}
					fullWidth
					style={{ marginTop: 12 }}
				/>
			</Card>
		</Container>
	);
}
