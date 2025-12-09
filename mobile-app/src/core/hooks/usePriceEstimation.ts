import { useMemo } from 'react';
import type { ErrandLocation, ErrandPricing } from '@/src/core/types';
import { PRICING_CONFIG } from '@/src/core/constants/errandTasks';

interface UsePriceEstimationParams {
	pickupLocation: ErrandLocation | null;
	deliveryLocation: ErrandLocation | null;
	itemPurchaseCost?: number;
	couponDiscount?: number;
	calculateDistance: (from: ErrandLocation, to: ErrandLocation) => number;
}

export const usePriceEstimation = ({
	pickupLocation,
	deliveryLocation,
	itemPurchaseCost = 0,
	couponDiscount = 0,
	calculateDistance,
}: UsePriceEstimationParams): ErrandPricing | null => {
	return useMemo(() => {
		if (!pickupLocation || !deliveryLocation) {
			return null;
		}

		const distance = calculateDistance(pickupLocation, deliveryLocation);
		const baseFee = PRICING_CONFIG.BASE_FEE;
		const distanceFee = Math.ceil(distance * PRICING_CONFIG.PER_KM_RATE);
		
		const subtotal = baseFee + distanceFee + itemPurchaseCost;
		const platformFee = Math.ceil(subtotal * PRICING_CONFIG.PLATFORM_FEE_PERCENTAGE);
		
		const totalBeforeDiscount = subtotal + platformFee;
		const discount = Math.min(couponDiscount, totalBeforeDiscount);
		const totalAmount = Math.max(
			totalBeforeDiscount - discount,
			PRICING_CONFIG.MINIMUM_TOTAL
		);

		return {
			baseFee,
			distanceFee,
			itemPurchaseCost,
			platformFee,
			discount,
			totalAmount,
			estimatedDistance: distance,
		};
	}, [pickupLocation, deliveryLocation, itemPurchaseCost, couponDiscount, calculateDistance]);
};
