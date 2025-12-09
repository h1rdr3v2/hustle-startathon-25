import { create } from 'zustand';
import type {
	ErrandFlowState,
	ErrandFlowStep,
	ErrandLocation,
	ErrandPricing,
	ErrandStatus,
	ErrandTaskDetails,
	ErrandTaskType,
	PaymentMethod,
	SelectedRunner,
} from '@/src/core/types';

interface ErrandFlowStore extends ErrandFlowState {
	// Actions
	setTaskType: (taskType: ErrandTaskType) => void;
	setPickupLocation: (location: ErrandLocation) => void;
	setDeliveryLocation: (location: ErrandLocation) => void;
	setTaskDetails: (details: ErrandTaskDetails) => void;
	setPricing: (pricing: ErrandPricing) => void;
	setSelectedRunner: (runner: SelectedRunner) => void;
	setPaymentMethod: (method: PaymentMethod) => void;
	setCouponCode: (code: string) => void;
	setCurrentStep: (step: ErrandFlowStep) => void;
	setStatus: (status: ErrandStatus) => void;
	nextStep: () => void;
	previousStep: () => void;
	resetFlow: () => void;
}

const STEP_ORDER: ErrandFlowStep[] = [
	'task_selection',
	'location_confirmation',
	'task_details',
	'price_preview',
	'runner_assignment',
	'final_confirmation',
	'completed',
];

const initialState: ErrandFlowState = {
	currentStep: 'task_selection',
	taskType: null,
	pickupLocation: null,
	deliveryLocation: null,
	taskDetails: null,
	pricing: null,
	selectedRunner: null,
	paymentMethod: null,
	couponCode: undefined,
	status: 'draft',
};

export const useErrandFlowStore = create<ErrandFlowStore>((set, get) => ({
	...initialState,

	setTaskType: (taskType) => set({ taskType }),

	setPickupLocation: (location) => set({ pickupLocation: location }),

	setDeliveryLocation: (location) => set({ deliveryLocation: location }),

	setTaskDetails: (details) => set({ taskDetails: details }),

	setPricing: (pricing) => set({ pricing }),

	setSelectedRunner: (runner) => set({ selectedRunner: runner }),

	setPaymentMethod: (method) => set({ paymentMethod: method }),

	setCouponCode: (code) => set({ couponCode: code }),

	setCurrentStep: (step) => set({ currentStep: step }),

	setStatus: (status) => set({ status }),

	nextStep: () => {
		const { currentStep } = get();
		const currentIndex = STEP_ORDER.indexOf(currentStep);
		if (currentIndex < STEP_ORDER.length - 1) {
			set({ currentStep: STEP_ORDER[currentIndex + 1] });
		}
	},

	previousStep: () => {
		const { currentStep } = get();
		const currentIndex = STEP_ORDER.indexOf(currentStep);
		if (currentIndex > 0) {
			set({ currentStep: STEP_ORDER[currentIndex - 1] });
		}
	},

	resetFlow: () => set({ ...initialState }),
}));
