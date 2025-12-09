// ==================== LOCATION ====================
export interface Location {
	latitude: number;
	longitude: number;
	address: string;
	city: 'Umuahia' | 'Aba' | 'Ohafia';
}

// ==================== USER ====================
export type UserRole = 'user' | 'runner' | 'both';

export interface User {
	id: string;
	name: string;
	email: string;
	phone: string;
	role: UserRole;
	profilePicture?: string;
	location?: Location;
	// Whether the user has completed KYC verification
	kycCompleted?: boolean;
	createdAt: Date;
}

// ==================== RUNNER ====================
export interface Runner {
	id: string;
	userId: string;
	name: string;
	phone: string;
	rating: number;
	totalDeliveries: number;
	currentLocation: Location;
	isAvailable: boolean;
	earnings: number;
}

// ==================== WALLET & PAYMENT ====================
export type TransactionType =
	| 'deposit'
	| 'withdrawal'
	| 'task_lock'
	| 'task_payment'
	| 'instant_lock'
	| 'instant_payment'
	| 'refund';

export type TransactionStatus = 'pending' | 'completed' | 'failed' | 'locked';

export interface Transaction {
	id: string;
	userId: string;
	amount: number;
	type: TransactionType;
	status: TransactionStatus;
	description: string;
	relatedTaskId?: string;
	relatedInstantTaskId?: string;
	createdAt: Date;
}

export interface Wallet {
	userId: string;
	availableBalance: number;
	lockedBalance: number;
	totalEarnings: number;
	transactions: Transaction[];
}

// ==================== VENDORS & ITEMS ====================
export type VendorCategory =
	| 'food'
	| 'drinks'
	| 'groceries'
	| 'pharmacy'
	| 'stationery'
	| 'other';

export type SectionType =
	| 'food'
	| 'gadgets'
	| 'groceries'
	| 'pharmacy'
	| 'drinks'
	| 'stationery';

export interface Section {
	id: string;
	name: string;
	type: SectionType;
	icon: string;
	description: string;
}

export interface Vendor {
	id: string;
	name: string;
	category: VendorCategory;
	location: Location;
	rating: number;
	isOpen: boolean;
	logo?: string;
}

export interface PredefinedItem {
	id: string;
	vendorId: string;
	name: string;
	description: string;
	price: number;
	category: VendorCategory;
	image?: string;
	isAvailable: boolean;
}

// ==================== INSTANT TASKS ====================
export type InstantTaskStatus =
	| 'open'
	| 'assigned'
	| 'in_progress'
	| 'delivered'
	| 'completed'
	| 'cancelled';

export interface InstantTask {
	id: string;
	userId: string;
	itemId: string;
	vendorId: string;
	runnerId?: string;

	// Pricing
	itemPrice: number;
	deliveryFee: number;
	totalAmount: number;

	// Locations
	pickupLocation: Location;
	deliveryLocation: Location;

	// Status & Timeline
	status: InstantTaskStatus;
	createdAt: Date;
	assignedAt?: Date;
	startedAt?: Date;
	deliveredAt?: Date;
	completedAt?: Date;

	// Contact & Notes
	userPhone: string;
	specialInstructions?: string;

	// Payment
	isPaid: boolean;
	paymentReleased: boolean;
}

// ==================== CUSTOM TASKS ====================
export type CustomTaskStatus =
	| 'open'
	| 'accepted'
	| 'in_progress'
	| 'awaiting_confirmation'
	| 'completed'
	| 'cancelled';

export type CustomTaskCategory =
	| 'shopping'
	| 'pickup'
	| 'delivery'
	| 'school_errand'
	| 'document'
	| 'other';

export interface CustomTask {
	id: string;
	userId: string;
	runnerId?: string;

	// Task Details
	title: string;
	description: string;
	category: CustomTaskCategory;
	budget: number;
	estimatedDuration: number; // in minutes

	// Locations
	pickupLocation?: Location;
	deliveryLocation?: Location;

	// Status & Timeline
	status: CustomTaskStatus;
	createdAt: Date;
	acceptedAt?: Date;
	startedAt?: Date;
	submittedAt?: Date;
	completedAt?: Date;

	// Contact
	userPhone: string;
	userEmail: string;

	// Payment
	amountLocked: boolean;
	paymentReleased: boolean;
}

// ==================== NOTIFICATIONS ====================
export type NotificationType =
	| 'instant_task_assigned'
	| 'custom_task_accepted'
	| 'task_started'
	| 'task_completed'
	| 'payment_released'
	| 'payment_received'
	| 'task_cancelled';

export interface Notification {
	id: string;
	userId: string;
	type: NotificationType;
	title: string;
	message: string;
	taskId?: string;
	instantTaskId?: string;
	isRead: boolean;
	createdAt: Date;
}

// ==================== AUTHENTICATION ====================
export interface AuthState {
	isAuthenticated: boolean;
	user: User | null;
	token: string | null;
}

export interface LoginCredentials {
	email: string;
	password: string;
}

export interface SignupData {
	name: string;
	email: string;
	phone: string;
	password: string;
	role: UserRole;
}

export interface OTPVerification {
	phone: string;
	code: string;
}

// ==================== FARE CALCULATION ====================
export interface FareConfig {
	flatRate: number;
	perKmRate: number;
	baseDistance: number; // in km
	minimumFare: number;
}

export interface FareCalculationResult {
	distance: number; // in km
	baseFare: number;
	distanceFare: number;
	totalFare: number;
}

// ==================== ERRAND FLOW ====================
export type ErrandTaskType =
	| 'buy_food'
	| 'run_errand'
	| 'pick_up_deliver'
	| 'make_purchase'
	| 'transport_item';

export type ErrandFlowStep =
	| 'task_selection'
	| 'location_confirmation'
	| 'task_details'
	| 'price_preview'
	| 'runner_assignment'
	| 'final_confirmation'
	| 'completed';

export type ErrandStatus =
	| 'draft'
	| 'pending_assignment'
	| 'assigned'
	| 'in_progress'
	| 'delivered'
	| 'completed'
	| 'cancelled';

export interface ErrandLocation {
	latitude: number;
	longitude: number;
	address: string;
	city: string;
	label?: string; // e.g., "Home", "Work"
	instructions?: string;
}

export interface ErrandTaskOption {
	id: ErrandTaskType;
	title: string;
	description: string;
	icon: string;
	color: string;
}

export interface ErrandTaskDetails {
	description: string;
	items?: string[];
	specialInstructions?: string;
	scheduledTime?: Date; // null means "now"
	attachments?: string[];
}

export interface ErrandPricing {
	baseFee: number;
	distanceFee: number;
	itemPurchaseCost: number;
	platformFee: number;
	discount: number;
	totalAmount: number;
	estimatedDistance: number; // in km
}

export interface SelectedRunner {
	id: string;
	name: string;
	rating: number;
	totalDeliveries: number;
	distance: number; // distance from pickup location
	estimatedArrival: number; // minutes
	profilePicture?: string;
	phone: string;
}

export interface PaymentMethod {
	id: string;
	type: 'wallet' | 'card' | 'cash';
	label: string;
	details?: string; // e.g., "**** 4242" for card
	isDefault: boolean;
}

export interface ErrandFlowState {
	currentStep: ErrandFlowStep;
	taskType: ErrandTaskType | null;
	pickupLocation: ErrandLocation | null;
	deliveryLocation: ErrandLocation | null;
	taskDetails: ErrandTaskDetails | null;
	pricing: ErrandPricing | null;
	selectedRunner: SelectedRunner | null;
	paymentMethod: PaymentMethod | null;
	couponCode?: string;
	status: ErrandStatus;
}

export interface SavedAddress extends ErrandLocation {
	id: string;
	userId: string;
	isDefault: boolean;
}

// ==================== API RESPONSES ====================
export interface ApiResponse<T> {
	success: boolean;
	data?: T;
	error?: string;
	message?: string;
}

export interface PaginatedResponse<T> {
	data: T[];
	total: number;
	page: number;
	pageSize: number;
	hasMore: boolean;
}
