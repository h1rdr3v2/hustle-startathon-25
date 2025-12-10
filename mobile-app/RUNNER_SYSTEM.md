# Runner System Documentation

## Overview

The errand app has been expanded to support a dual-account system where **every user can optionally become a runner**. There is only one account type — runners are simply users who have unlocked runner capabilities by applying and getting approved.

---

## Architecture

### 1. **User Type System**

The `User` interface now includes:

```typescript
runnerStatus: 'not_applied' | 'pending' | 'approved' | 'rejected'
runnerProfile?: RunnerProfile  // Only exists when approved
runnerApplication?: RunnerApplication  // Exists when pending/approved/rejected
```

### 2. **Runner Status Flow**

```
not_applied → (User applies) → pending → (Admin reviews) → approved/rejected
                                                            ↓ (can reapply)
                                                         not_applied
```

---

## Features Implemented

### 1. Runner Application Flow

**Location**: `/runner-application`

**Access**:

- Available from Profile screen when `runnerStatus === 'not_applied'`
- Also accessible after rejection for reapplication

**Form Sections**:

- **Personal Information**: Name, email, phone, DOB, address, city
- **Vehicle Information**: Type (motorcycle/car/bicycle/on_foot), make, model, year, plate
- **Documents**: Driver's license, vehicle registration
- **Experience**: Previous delivery experience, years, employer
- **Availability**: Days of week, working hours
- **Additional**: Motivation for joining, how they heard about us

**Submission Process**:

```typescript
submitRunnerApplication(application) → status changes to 'pending'
```

### 2. Profile Integration

**Location**: `/profile`

**Runner Status Indicator**:

- Shows current status with color-coded badges:
    - 🟢 Green: Approved Runner
    - 🟡 Yellow: Application Pending
    - 🔴 Red: Application Rejected
    - ⚪ Gray: Not a Runner

**Dynamic Buttons**:

- `not_applied`: "Apply to Become a Runner" button
- `pending`: Status message (no action button)
- `approved`: "Open Runner Dashboard" button
- `rejected`: "Reapply as Runner" button (shows rejection reason)

### 3. Runner Dashboard

**Location**: `/(runner)/dashboard`

**Access**: Only for approved runners (`runnerStatus === 'approved'`)

**Features**:

- **Availability Toggle**: Go online/offline for accepting tasks
- **Today's Stats**: Active tasks, completed deliveries, earnings
- **Overall Performance**: Total deliveries, rating, acceptance rate, on-time rate
- **Quick Actions**: Navigate to Available Tasks, Earnings, Settings

**Key Metrics**:

```typescript
interface RunnerProfile {
	rating: number;
	totalDeliveries: number;
	completedDeliveries: number;
	totalEarnings: number;
	availableEarnings: number;
	isAvailable: boolean;
	acceptanceRate: number;
	onTimeRate: number;
}
```

### 4. Available Tasks

**Location**: `/(runner)/available-tasks`

**Features**:

- List of nearby tasks ready for pickup
- Filter options: All Tasks, Nearby, High Pay
- Task cards showing:
    - Task type and priority
    - Pickup and delivery addresses
    - Distance and estimated time
    - Payment amount
    - "Accept Task" button

### 5. Earnings

**Location**: `/(runner)/earnings`

**Features**:

- Total earnings summary card
- Available vs pending earnings breakdown
- Withdrawal button
- Weekly and monthly earnings stats
- Detailed earnings history with:
    - Task type
    - Date
    - Amount
    - Status

### 6. Runner Settings

**Location**: `/(runner)/settings`

**Features**:

- **Runner Status**: Display active status, member since date, rating
- **Vehicle Information**: View and update vehicle details
- **Availability Schedule**: Manage days and hours
- **Documents**: View verification status for license and registration
- **Danger Zone**: Deactivate runner account option

### 7. Home Screen Enhancement

**Location**: `/index`

**Runner Mode Button**:

- Only visible when `runnerStatus === 'approved'`
- Prominent green button above task options
- Quick access to Runner Dashboard
- Shows "Switch to runner dashboard" message

---

## State Management

### Auth Store Methods

```typescript
// Submit new runner application
submitRunnerApplication(application: RunnerApplication): Promise<void>

// Update runner status (admin function)
updateRunnerStatus(status: 'pending' | 'approved' | 'rejected', rejectionReason?: string): void

// Update runner profile data
updateRunnerProfile(profile: Partial<RunnerProfile>): void

// Toggle online/offline status
toggleRunnerAvailability(): void
```

### Storage

All runner data is persisted via Zustand + MMKV for:

- Runner application data
- Runner profile information
- Availability status
- Performance metrics

---

## User Experience Flow

### Becoming a Runner

1. **User opens Profile**
    - Sees "Not a Runner" status
    - Clicks "Apply to Become a Runner"

2. **Fill Application Form**
    - Completes all required fields
    - Provides vehicle and document information
    - Submits application

3. **Application Submitted**
    - Status changes to "Pending"
    - Profile shows pending badge
    - User receives confirmation message

4. **Admin Reviews** (Backend process)
    - Reviews application
    - Approves or rejects with reason

5. **Approved**
    - Status changes to "Approved"
    - `runnerProfile` is created with initial stats
    - "Open Runner Dashboard" button appears
    - Runner Mode button appears on home screen

6. **As a Runner**
    - Can toggle online/offline
    - Can view and accept available tasks
    - Track earnings and performance
    - Manage runner settings

### Switching Between Modes

**User Mode → Runner Mode**:

- Click "Runner Mode" button on home screen
- OR click "Open Runner Dashboard" in profile
- Takes user to `/(runner)/dashboard`

**Runner Mode → User Mode**:

- Click "Back to User Mode" in runner dashboard
- Returns to home screen with user tasks

---

## Navigation Structure

```
/
├── index (Home - with Runner Mode button if approved)
├── profile (Shows runner status and application button)
├── runner-application (Application form)
└── (runner)/
    ├── dashboard (Main runner hub)
    ├── available-tasks (Browse and accept tasks)
    ├── earnings (View earnings and history)
    └── settings (Manage runner profile)
```

---

## Type Definitions

### Key Types

```typescript
type RunnerStatus = 'not_applied' | 'pending' | 'approved' | 'rejected';
type VehicleType = 'bicycle' | 'motorcycle' | 'car' | 'on_foot';

interface RunnerApplication {
	id: string;
	userId: string;
	status: RunnerStatus;
	fullName: string;
	email: string;
	phone: string;
	dateOfBirth: string;
	address: string;
	city: 'Umuahia' | 'Aba' | 'Ohafia';
	vehicleType: VehicleType;
	vehicleMake?: string;
	vehicleModel?: string;
	hasDriversLicense: boolean;
	hasDeliveryExperience: boolean;
	availableDays: string[];
	availableHours: string;
	whyJoin: string;
	appliedAt: Date;
	reviewedAt?: Date;
	rejectionReason?: string;
}

interface RunnerProfile {
	userId: string;
	rating: number;
	totalDeliveries: number;
	completedDeliveries: number;
	totalEarnings: number;
	availableEarnings: number;
	isAvailable: boolean;
	acceptanceRate: number;
	onTimeRate: number;
	joinedAsRunnerAt: Date;
}
```

---

## UI Components

All screens follow the existing design patterns:

- **Colors**: Uses theme colors (primary, success, warning, error)
- **Components**: Reuses existing UI components (Button, Input, SafeAreaView, Section)
- **Typography**: Consistent with app's Title, Subtitle, and text styles
- **Cards**: Rounded corners, shadows, color-coded status indicators
- **Buttons**: Proper variants (primary, outline, ghost, danger)

---

## Testing the Runner Flow

### Mock User Testing

1. **Login** with any credentials
2. **Navigate to Profile**
3. **Click "Apply to Become a Runner"**
4. **Fill out the form** with test data
5. **Submit application** - Status changes to "Pending"

### Simulating Approval (For Testing)

To test the approved state, you can manually update the user in the auth store:

```typescript
// In your code or via console
updateRunnerStatus('approved');
```

This will:

- Change status to 'approved'
- Create initial runner profile
- Enable Runner Dashboard access
- Show Runner Mode button on home

---

## Future Enhancements

Potential features to add:

1. **Admin Panel**: For reviewing and managing applications
2. **Document Upload**: Allow runners to upload license/registration photos
3. **Real-time Task Matching**: Push notifications for new tasks
4. **In-app Chat**: Communication between users and runners
5. **Earnings Withdrawal**: Integration with payment gateway
6. **Performance Analytics**: Detailed charts and insights
7. **Rating System**: User ratings and reviews for runners
8. **Task History**: Complete history of accepted/completed tasks
9. **Geo-tracking**: Real-time location tracking during deliveries
10. **Scheduled Tasks**: Allow runners to accept tasks in advance

---

## Notes

- All runner data is currently stored locally in MMKV
- API integration points are marked with `// TODO:` comments
- Mock data is used for available tasks and earnings
- The system is designed to easily integrate with a backend API
- The Picker component requires `@react-native-picker/picker` to be installed

---

## Summary

The runner system successfully transforms the app into a dual-mode platform where users can seamlessly switch between requesting errands and fulfilling them as runners. The implementation maintains a clean, modern UI consistent with the existing design, while adding comprehensive features for runner management, performance tracking, and earnings monitoring.
