# Errand Flow System

## Overview

A complete, guided errand request flow that takes users step-by-step through creating custom task requests with runners. The system implements a modern, mobile-first UX pattern with clear state management and reusable components.

## Architecture

### Flow States

The errand flow follows a linear progression through these steps:

1. **Task Selection** - User chooses what they want help with
2. **Location Confirmation** - Set pickup and delivery addresses
3. **Task Details** - Describe the request in detail
4. **Price Preview** - Review estimated costs
5. **Runner Assignment** - Select from available nearby runners
6. **Final Confirmation** - Review all details and submit
7. **Success** - Confirmation and next steps

### State Management

**Store**: `useErrandFlowStore` (Zustand)
- Centralized state for entire flow
- Persists user selections across screens
- Handles navigation between steps
- Provides reset functionality

**Key State:**
```typescript
{
  currentStep: ErrandFlowStep;
  taskType: ErrandTaskType | null;
  pickupLocation: ErrandLocation | null;
  deliveryLocation: ErrandLocation | null;
  taskDetails: ErrandTaskDetails | null;
  pricing: ErrandPricing | null;
  selectedRunner: SelectedRunner | null;
  paymentMethod: PaymentMethod | null;
  status: ErrandStatus;
}
```

## Components

### Reusable UI Components

All components follow the design system and support dark mode:

#### `OptionCard`
Displays task type options with icon, title, and description.
- **Props**: title, description, icon, color, onPress, selected
- **Usage**: Task selection screen

#### `LocationInput`
Handles location selection with address display and detection.
- **Props**: label, location, onPress, onDetectLocation, loading, error
- **Features**: Current location detection, saved addresses

#### `PriceCard`
Shows pricing breakdown with itemized costs.
- **Props**: pricing, showDetails
- **Features**: Expandable details, currency formatting

#### `RunnerCard`
Displays runner information for selection.
- **Props**: runner, onSelect, selected
- **Shows**: Name, rating, deliveries, distance, ETA

#### `ConfirmModal`
Reusable confirmation dialog.
- **Props**: visible, title, message, onConfirm, onCancel, loading
- **Variants**: primary, danger

#### `Section`
Layout wrapper for consistent spacing.
- **Props**: children, spacing, style

## Hooks

### `useLocation`
Manages location services and permissions.
- `getCurrentLocation()` - Gets user's current position
- `geocodeAddress(address)` - Converts address to coordinates
- `calculateDistance(from, to)` - Haversine distance calculation
- `requestPermission()` - Handles location permissions

### `usePriceEstimation`
Calculates real-time pricing based on parameters.
- Auto-recalculates when inputs change
- Considers: base fee, distance, item cost, platform fee, discounts
- Returns complete `ErrandPricing` object

### `useErrandRunners`
Fetches and manages available runners.
- `fetchNearbyRunners()` - Loads runners near pickup location
- `selectRunner(runner)` - Sets selected runner
- `clearSelection()` - Resets selection
- **Auto-select**: Optionally selects closest runner

## Screens

### 1. Home Screen (`/errand/index.tsx`)
**Purpose**: Present "I want to..." task options

**Features**:
- Clean, guided interface
- 5 task type options with emojis
- "How it works" section with numbered steps
- Authentication check before proceeding

**Flow**:
```
User selects task type → Resets flow → Navigates to location screen
```

### 2. Location Confirmation (`/errand/location.tsx`)
**Purpose**: Capture pickup and delivery locations

**Features**:
- Dual location inputs (pickup & delivery)
- Current location detection
- Saved addresses display
- Real-time validation

**Validations**:
- Both locations required
- Shows errors if missing

### 3. Task Details (`/errand/task-details.tsx`)
**Purpose**: Collect detailed task description

**Features**:
- Multi-line description (required)
- Items list for purchases (optional, line-separated)
- Special instructions field
- Schedule options (now vs. later)

**Conditional Fields**:
- Items list shown for: buy_food, make_purchase, run_errand

### 4. Price Preview (`/errand/price-preview.tsx`)
**Purpose**: Display cost estimate and handle coupons

**Features**:
- Real-time price calculation
- Optional item purchase cost input
- Coupon code application
- Detailed price breakdown
- Important disclaimers

**Pricing Formula**:
```
Total = Base Fee + (Distance × Rate) + Item Cost + Platform Fee - Discount
```

### 5. Runner Selection (`/errand/runner-selection.tsx`)
**Purpose**: Match user with available runner

**Features**:
- Automatic runner search on mount
- Sorted by distance (closest first)
- Auto-select after 2 seconds
- Runner details: rating, deliveries, distance, ETA
- Loading states

**Empty State**: Handles no available runners gracefully

### 6. Final Confirmation (`/errand/confirmation.tsx`)
**Purpose**: Review all details before submission

**Displays**:
- Task summary
- Pickup & delivery locations
- Selected runner info
- Price breakdown
- Payment method selection
- Terms & conditions

**Payment Methods**:
- Wallet
- Credit/Debit Card
- Cash on Delivery

**Flow**:
```
Review → Confirm button → Modal → Submit → Success screen
```

### 7. Success Screen (`/errand/success.tsx`)
**Purpose**: Confirmation and next steps

**Features**:
- Success animation/icon
- Runner and ETA info cards
- "What's Next" numbered steps
- Action buttons: View Tracking, New Request
- Auto-reset after 30 seconds

## Constants

### Task Options (`errandTasks.ts`)
```typescript
ERRAND_TASK_OPTIONS: [
  { id: 'buy_food', title: 'Buy Food', icon: '🍔', color: '#FF6B35' },
  { id: 'run_errand', title: 'Run an Errand', icon: '🏃', color: '#4ECDC4' },
  { id: 'pick_up_deliver', title: 'Pick Up & Deliver', icon: '📦', color: '#95E1D3' },
  { id: 'make_purchase', title: 'Make a Purchase', icon: '🛒', color: '#F38181' },
  { id: 'transport_item', title: 'Transport an Item', icon: '🚗', color: '#AA96DA' }
]
```

### Pricing Config
```typescript
{
  BASE_FEE: 500,              // NGN
  PER_KM_RATE: 150,           // NGN per km
  PLATFORM_FEE_PERCENTAGE: 0.05, // 5%
  MINIMUM_TOTAL: 800          // NGN
}
```

## Types

### Core Types (`types/index.ts`)

**ErrandTaskType**: Task categories
**ErrandFlowStep**: Flow progression stages
**ErrandLocation**: Geographic coordinates + address
**ErrandTaskDetails**: User's task description
**ErrandPricing**: Complete price breakdown
**SelectedRunner**: Runner profile for assignment
**PaymentMethod**: Payment options
**ErrandFlowState**: Complete flow state

## Navigation Structure

```
/(screens)/errand/
├── index.tsx               # Home/Task Selection
├── location.tsx           # Location Confirmation
├── task-details.tsx       # Task Details
├── price-preview.tsx      # Price Preview
├── runner-selection.tsx   # Runner Assignment
├── confirmation.tsx       # Final Confirmation
└── success.tsx           # Success Screen
```

## Usage Example

### Starting the Flow
```typescript
import { useErrandFlowStore } from '@/src/core/stores/errandFlowStore';
import { useRouter } from 'expo-router';

const { setTaskType, resetFlow } = useErrandFlowStore();
const router = useRouter();

// Start new errand
resetFlow();
setTaskType('buy_food');
router.push('/(screens)/errand/location');
```

### Accessing Flow State
```typescript
const {
  taskType,
  pickupLocation,
  deliveryLocation,
  pricing,
  selectedRunner
} = useErrandFlowStore();
```

## Design Principles

1. **Guided Experience**: Users are never overwhelmed - one question at a time
2. **Clear Validation**: Immediate feedback on errors
3. **Progressive Disclosure**: Show relevant fields based on context
4. **Smart Defaults**: Auto-select when sensible (e.g., closest runner)
5. **Transparent Pricing**: No hidden costs, clear breakdown
6. **Safety First**: Confirmation modal before final submission

## Future Enhancements

- [ ] Photo attachments for tasks
- [ ] Voice description input
- [ ] Real-time runner tracking
- [ ] In-app messaging with runner
- [ ] Multiple payment cards management
- [ ] Schedule recurring tasks
- [ ] Task templates for frequent requests
- [ ] Runner preferences and favorites

## Testing Notes

### Mock Data
- Runners: 4 mock runners with varying ratings/distances
- Locations: 2 saved addresses (Home, Work)
- Pricing: Calculated using constants

### Edge Cases Handled
- No runners available
- Location permission denied
- Missing required fields
- Network errors (placeholder)
- Invalid coupon codes (simulated)

## Integration Points

### Required APIs
- Location services (Expo Location)
- Runner availability endpoint
- Price calculation service
- Payment processing
- Task submission endpoint

### Authentication
- Checks `useAuthStore` before allowing flow
- Redirects to login if not authenticated

## Accessibility

- Semantic HTML/components
- Touch target sizes (44x44 minimum)
- Color contrast compliance
- Loading states with spinners
- Error messages with icons
- Support for screen readers (Text components)

## Performance

- Zustand for lightweight state
- Memoized price calculations
- Lazy loading of runner data
- Debounced location updates
- Optimized re-renders with proper deps

---

**Built with**: React Native, Expo Router, Zustand, TypeScript
**Design System**: Custom theme with dark mode support
**Navigation**: File-based routing with Expo Router
