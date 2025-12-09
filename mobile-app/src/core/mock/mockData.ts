// Mock data for vendors and predefined items in Abia State

import { Vendor, PredefinedItem, Location } from '@/src/core/types';

// Mock locations in Abia State
export const mockLocations: Record<string, Location> = {
	umuahiaCenter: {
		latitude: 5.5256,
		longitude: 7.4905,
		address: 'Aba Road, Umuahia',
		city: 'Umuahia',
	},
	abaMarket: {
		latitude: 5.1068,
		longitude: 7.3667,
		address: 'Ariaria Market, Aba',
		city: 'Aba',
	},
	ohafiaCenter: {
		latitude: 5.6667,
		longitude: 7.8333,
		address: 'Ohafia Town Center',
		city: 'Ohafia',
	},
	schoolGate: {
		latitude: 5.5332,
		longitude: 7.4812,
		address: 'University Gate, Umuahia',
		city: 'Umuahia',
	},
	shopRiteAba: {
		latitude: 5.1167,
		longitude: 7.3778,
		address: 'Shoprite, Aba',
		city: 'Aba',
	},
};

// Mock vendors
export const mockVendors: Vendor[] = [
	{
		id: 'vendor_1',
		name: 'Crunchies',
		category: 'food',
		location: mockLocations.umuahiaCenter,
		rating: 4.5,
		isOpen: true,
		logo: '🍔',
	},
	{
		id: 'vendor_2',
		name: 'Kilimanjaro',
		category: 'food',
		location: mockLocations.umuahiaCenter,
		rating: 4.7,
		isOpen: true,
		logo: '🍕',
	},
	{
		id: 'vendor_3',
		name: 'ShopRite Aba',
		category: 'groceries',
		location: mockLocations.shopRiteAba,
		rating: 4.8,
		isOpen: true,
		logo: '🛒',
	},
	{
		id: 'vendor_4',
		name: 'Fresh Drinks',
		category: 'drinks',
		location: mockLocations.abaMarket,
		rating: 4.3,
		isOpen: true,
		logo: '🥤',
	},
	{
		id: 'vendor_5',
		name: 'HealthPlus Pharmacy',
		category: 'pharmacy',
		location: mockLocations.umuahiaCenter,
		rating: 4.6,
		isOpen: true,
		logo: '💊',
	},
	{
		id: 'vendor_6',
		name: 'Campus Stationery',
		category: 'stationery',
		location: mockLocations.schoolGate,
		rating: 4.4,
		isOpen: true,
		logo: '📚',
	},
];

// Mock predefined items
export const mockPredefinedItems: PredefinedItem[] = [
	// Crunchies items
	{
		id: 'item_1',
		vendorId: 'vendor_1',
		name: 'Beef Burger',
		description: 'Juicy beef burger with fries',
		price: 2500,
		category: 'food',
		image: '🍔',
		isAvailable: true,
	},
	{
		id: 'item_2',
		vendorId: 'vendor_1',
		name: 'Chicken Wings',
		description: 'Spicy chicken wings (6 pcs)',
		price: 2000,
		category: 'food',
		image: '🍗',
		isAvailable: true,
	},
	{
		id: 'item_3',
		vendorId: 'vendor_1',
		name: 'Shawarma',
		description: 'Chicken shawarma wrap',
		price: 1500,
		category: 'food',
		image: '🌯',
		isAvailable: true,
	},

	// Kilimanjaro items
	{
		id: 'item_4',
		vendorId: 'vendor_2',
		name: 'Pepperoni Pizza',
		description: 'Large pepperoni pizza',
		price: 4500,
		category: 'food',
		image: '🍕',
		isAvailable: true,
	},
	{
		id: 'item_5',
		vendorId: 'vendor_2',
		name: 'Pasta Carbonara',
		description: 'Creamy pasta with bacon',
		price: 3000,
		category: 'food',
		image: '🍝',
		isAvailable: true,
	},

	// ShopRite items
	{
		id: 'item_6',
		vendorId: 'vendor_3',
		name: 'Fresh Milk (1L)',
		description: 'Peak milk 1 liter',
		price: 1200,
		category: 'groceries',
		image: '🥛',
		isAvailable: true,
	},
	{
		id: 'item_7',
		vendorId: 'vendor_3',
		name: 'Bread (Large)',
		description: 'Agege bread large size',
		price: 800,
		category: 'groceries',
		image: '🍞',
		isAvailable: true,
	},
	{
		id: 'item_8',
		vendorId: 'vendor_3',
		name: 'Eggs (Crate)',
		description: '30 eggs in a crate',
		price: 2800,
		category: 'groceries',
		image: '🥚',
		isAvailable: true,
	},

	// Fresh Drinks items
	{
		id: 'item_9',
		vendorId: 'vendor_4',
		name: 'Coca-Cola (50cl)',
		description: 'Cold Coca-Cola bottle',
		price: 300,
		category: 'drinks',
		image: '🥤',
		isAvailable: true,
	},
	{
		id: 'item_10',
		vendorId: 'vendor_4',
		name: 'Smoothie (Mixed Fruit)',
		description: 'Fresh mixed fruit smoothie',
		price: 1000,
		category: 'drinks',
		image: '🥤',
		isAvailable: true,
	},
	{
		id: 'item_11',
		vendorId: 'vendor_4',
		name: 'Energy Drink',
		description: 'Lucozade Energy boost',
		price: 500,
		category: 'drinks',
		image: '⚡',
		isAvailable: true,
	},

	// HealthPlus Pharmacy items
	{
		id: 'item_12',
		vendorId: 'vendor_5',
		name: 'Paracetamol',
		description: 'Pain relief tablets',
		price: 200,
		category: 'pharmacy',
		image: '💊',
		isAvailable: true,
	},
	{
		id: 'item_13',
		vendorId: 'vendor_5',
		name: 'Vitamin C',
		description: 'Vitamin C supplements',
		price: 1500,
		category: 'pharmacy',
		image: '💊',
		isAvailable: true,
	},

	// Campus Stationery items
	{
		id: 'item_14',
		vendorId: 'vendor_6',
		name: 'Exercise Book (60 leaves)',
		description: 'Standard exercise book',
		price: 250,
		category: 'stationery',
		image: '📓',
		isAvailable: true,
	},
	{
		id: 'item_15',
		vendorId: 'vendor_6',
		name: 'Pen (Pack of 10)',
		description: 'Blue ball pens',
		price: 500,
		category: 'stationery',
		image: '✏️',
		isAvailable: true,
	},
];
