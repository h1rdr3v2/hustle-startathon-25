import type { ErrandTaskOption } from '@/src/core/types';

export const ERRAND_TASK_OPTIONS: ErrandTaskOption[] = [
	{
		id: 'buy_food',
		title: 'Buy Food',
		description: 'Order food from restaurants or food vendors',
		icon: '🍔',
		color: '#FF6B35',
	},
	{
		id: 'run_errand',
		title: 'Run an Errand',
		description: 'Get someone to handle tasks for you',
		icon: '🏃',
		color: '#4ECDC4',
	},
	{
		id: 'pick_up_deliver',
		title: 'Pick Up & Deliver',
		description: 'Pick up items from one place and deliver to another',
		icon: '📦',
		color: '#95E1D3',
	},
	{
		id: 'make_purchase',
		title: 'Make a Purchase',
		description: 'Buy items from stores on your behalf',
		icon: '🛒',
		color: '#F38181',
	},
	{
		id: 'transport_item',
		title: 'Transport an Item',
		description: 'Move items from one location to another',
		icon: '🚗',
		color: '#AA96DA',
	},
];

export const PRICING_CONFIG = {
	BASE_FEE: 500, // NGN
	PER_KM_RATE: 150, // NGN per km
	PLATFORM_FEE_PERCENTAGE: 0.05, // 5%
	MINIMUM_TOTAL: 800, // NGN
};
