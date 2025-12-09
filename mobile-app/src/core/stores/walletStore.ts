import { create } from 'zustand';
import { Wallet, Transaction, TransactionType } from '@/src/core/types';

interface WalletStore {
	wallets: Record<string, Wallet>;
	getWallet: (userId: string) => Wallet | undefined;
	initializeWallet: (userId: string) => void;
	lockFunds: (
		userId: string,
		amount: number,
		taskId: string,
		type: TransactionType,
	) => boolean;
	releaseFunds: (userId: string, amount: number, taskId: string) => void;
	refundFunds: (userId: string, amount: number, taskId: string) => void;
	addEarnings: (
		runnerId: string,
		amount: number,
		taskId: string,
		description: string,
	) => void;
	addTransaction: (
		userId: string,
		transaction: Omit<Transaction, 'id' | 'createdAt'>,
	) => void;
	getTransactions: (userId: string) => Transaction[];
}

export const useWalletStore = create<WalletStore>((set, get) => ({
	wallets: {},

	getWallet: (userId) => get().wallets[userId],

	initializeWallet: (userId) =>
		set((state) => {
			if (!state.wallets[userId]) {
				return {
					wallets: {
						...state.wallets,
						[userId]: {
							userId,
							availableBalance: 5000, // Mock starting balance
							lockedBalance: 0,
							totalEarnings: 0,
							transactions: [],
						},
					},
				};
			}
			return state;
		}),

	lockFunds: (userId, amount, taskId, type) => {
		const wallet = get().wallets[userId];

		if (!wallet || wallet.availableBalance < amount) {
			return false;
		}

		set((state) => ({
			wallets: {
				...state.wallets,
				[userId]: {
					...wallet,
					availableBalance: wallet.availableBalance - amount,
					lockedBalance: wallet.lockedBalance + amount,
					transactions: [
						...wallet.transactions,
						{
							id: `txn_${Date.now()}_${Math.random()}`,
							userId,
							amount,
							type,
							status: 'locked',
							description: `Funds locked for task`,
							relatedTaskId: taskId,
							createdAt: new Date(),
						},
					],
				},
			},
		}));

		return true;
	},

	releaseFunds: (userId, amount, taskId) => {
		const wallet = get().wallets[userId];
		if (!wallet) return;

		set((state) => ({
			wallets: {
				...state.wallets,
				[userId]: {
					...wallet,
					lockedBalance: wallet.lockedBalance - amount,
					transactions: [
						...wallet.transactions,
						{
							id: `txn_${Date.now()}_${Math.random()}`,
							userId,
							amount,
							type: 'task_payment',
							status: 'completed',
							description: `Payment released for task`,
							relatedTaskId: taskId,
							createdAt: new Date(),
						},
					],
				},
			},
		}));
	},

	refundFunds: (userId, amount, taskId) => {
		const wallet = get().wallets[userId];
		if (!wallet) return;

		set((state) => ({
			wallets: {
				...state.wallets,
				[userId]: {
					...wallet,
					availableBalance: wallet.availableBalance + amount,
					lockedBalance: wallet.lockedBalance - amount,
					transactions: [
						...wallet.transactions,
						{
							id: `txn_${Date.now()}_${Math.random()}`,
							userId,
							amount,
							type: 'refund',
							status: 'completed',
							description: `Refund for cancelled task`,
							relatedTaskId: taskId,
							createdAt: new Date(),
						},
					],
				},
			},
		}));
	},

	addEarnings: (runnerId, amount, taskId, description) => {
		const wallet = get().wallets[runnerId];
		if (!wallet) return;

		set((state) => ({
			wallets: {
				...state.wallets,
				[runnerId]: {
					...wallet,
					availableBalance: wallet.availableBalance + amount,
					totalEarnings: wallet.totalEarnings + amount,
					transactions: [
						...wallet.transactions,
						{
							id: `txn_${Date.now()}_${Math.random()}`,
							userId: runnerId,
							amount,
							type: 'task_payment',
							status: 'completed',
							description,
							relatedTaskId: taskId,
							createdAt: new Date(),
						},
					],
				},
			},
		}));
	},

	addTransaction: (userId, transaction) => {
		const wallet = get().wallets[userId];
		if (!wallet) return;

		set((state) => ({
			wallets: {
				...state.wallets,
				[userId]: {
					...wallet,
					transactions: [
						...wallet.transactions,
						{
							...transaction,
							id: `txn_${Date.now()}_${Math.random()}`,
							createdAt: new Date(),
						},
					],
				},
			},
		}));
	},

	getTransactions: (userId) => {
		const wallet = get().wallets[userId];
		return wallet?.transactions || [];
	},
}));
