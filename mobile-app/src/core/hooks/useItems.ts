import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
	mockGetPredefinedItems,
	mockGetVendors,
	mockGetItemsByVendor,
} from '@/src/core/api';
import { PredefinedItem, Vendor } from '@/src/core/types';

export const usePredefinedItems = () => {
	return useQuery<PredefinedItem[]>({
		queryKey: ['predefinedItems'],
		queryFn: () => mockGetPredefinedItems().then((r) => r.data || []),
	});
};

export const useVendors = () => {
	return useQuery<Vendor[]>({
		queryKey: ['vendors'],
		queryFn: () => mockGetVendors().then((r) => r.data || []),
	});
};

export const useItemsByVendor = (vendorId: string) => {
	return useQuery<PredefinedItem[]>({
		queryKey: ['itemsByVendor', vendorId],
		queryFn: () => mockGetItemsByVendor(vendorId).then((r) => r.data || []),
		enabled: !!vendorId,
	});
};
