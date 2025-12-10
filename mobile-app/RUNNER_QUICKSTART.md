# Runner System - Quick Start Guide

## 🎯 Overview

Your errand app now supports users becoming runners! Users can apply, get approved, and switch between requesting errands and fulfilling them.

---

## 🚀 Getting Started

### Prerequisites

Install the required package for the Picker component:

```bash
npm install @react-native-picker/picker
# or
yarn add @react-native-picker/picker
```

---

## 📱 User Journey

### Phase 1: Regular User (Default State)

```
┌─────────────┐
│  Home Page  │
│             │  ← Shows task options
│ [Profile]   │
└─────────────┘
       │
       ▼
┌─────────────┐
│   Profile   │
│             │
│ Status:     │
│ Not a Runner│  ← Shows "Apply to Become Runner" button
└─────────────┘
```

### Phase 2: Applying to Become a Runner

```
┌─────────────┐
│   Profile   │  Click "Apply to Become Runner"
└──────┬──────┘
       │
       ▼
┌─────────────────────┐
│ Application Form    │
│                     │
│ • Personal Info     │
│ • Vehicle Details   │
│ • Documents         │
│ • Experience        │
│ • Availability      │
└──────┬──────────────┘
       │
       ▼ Submit
┌─────────────┐
│   Profile   │
│             │
│ Status:     │
│ ⏳ Pending  │  ← Shows pending message
└─────────────┘
```

### Phase 3: Approved Runner (Full Access)

```
┌─────────────────┐
│   Home Page     │
│                 │
│ ╔═════════════╗ │
│ ║ Runner Mode ║ │  ← NEW: Quick access button
│ ╚═════════════╝ │
│                 │
│ Task options... │
└────────┬────────┘
         │
         ├──────────────┐
         │              │
         ▼              ▼
┌─────────────┐  ┌──────────────┐
│   Profile   │  │   Runner     │
│             │  │  Dashboard   │
│ Status:     │  │              │
│ ✓ Approved  │  │ • Stats      │
│             │  │ • Tasks      │
│ [Open       │  │ • Earnings   │
│  Dashboard] │  │ • Settings   │
└─────────────┘  └──────────────┘
```

---

## 🗂️ File Structure

### New Files Created

```
src/
├── app/
│   ├── runner-application.tsx          # Application form
│   └── (runner)/                       # Runner-only screens
│       ├── _layout.tsx                 # Nested navigation
│       ├── dashboard.tsx               # Main runner hub
│       ├── available-tasks.tsx         # Browse tasks
│       ├── earnings.tsx                # Earnings tracking
│       └── settings.tsx                # Runner settings
└── core/
    ├── types/
    │   └── index.ts                    # Updated with runner types
    └── stores/
        └── authStore.ts                # Added runner methods
```

### Modified Files

```
src/
├── app/
│   ├── _layout.tsx                     # Added runner routes
│   ├── index.tsx                       # Added Runner Mode button
│   └── profile.tsx                     # Added runner status section
└── core/
    └── api/
        └── authApi.ts                  # Added runnerStatus to mock users
```

---

## 🎨 Key Features

### 1️⃣ Profile Screen Updates

**Location**: `/profile`

Shows dynamic content based on runner status:

- **Not Applied**: Button to apply
- **Pending**: Status message with waiting period
- **Approved**: Button to open dashboard + stats
- **Rejected**: Reapply button + rejection reason

### 2️⃣ Runner Application Form

**Location**: `/runner-application`

Comprehensive form with validation:

- Personal details (name, email, DOB, address)
- Vehicle information (type, make, model)
- Documents (license, registration)
- Experience level
- Availability (days & hours)
- Motivation statement

### 3️⃣ Runner Dashboard

**Location**: `/(runner)/dashboard`

Main hub for runners featuring:

- **Availability Toggle**: Go online/offline
- **Today's Stats**: Active tasks, completions, earnings
- **Performance Metrics**: Rating, acceptance rate, on-time rate
- **Quick Actions**: Links to tasks, earnings, settings

### 4️⃣ Available Tasks

**Location**: `/(runner)/available-tasks`

Task marketplace with:

- Task cards showing all details
- Filter options (All, Nearby, High Pay)
- Accept task functionality
- Priority indicators

### 5️⃣ Earnings

**Location**: `/(runner)/earnings`

Financial overview with:

- Total earnings summary
- Available vs pending balance
- Withdraw button
- Weekly/monthly breakdown
- Earnings history

### 6️⃣ Runner Settings

**Location**: `/(runner)/settings`

Profile management with:

- Status overview
- Vehicle information
- Availability schedule
- Document verification status
- Account deactivation option

---

## 🔄 State Management

### Runner-Related Store Methods

```typescript
// Submit application
submitRunnerApplication(application)

// Update status (admin function)
updateRunnerStatus('approved' | 'rejected', reason?)

// Update profile data
updateRunnerProfile(profileUpdates)

// Toggle online/offline
toggleRunnerAvailability()
```

---

## 🧪 Testing Instructions

### Test Flow 1: Apply as Runner

1. Login with any credentials
2. Go to Profile
3. Click "Apply to Become a Runner"
4. Fill form with test data
5. Submit → See "Pending" status

### Test Flow 2: Approve Runner (Manual)

To test the approved state, add this to your test code:

```typescript
const { updateRunnerStatus } = useAuthStore();
updateRunnerStatus('approved');
```

### Test Flow 3: Use Runner Features

1. After approval, go to Home
2. See "Runner Mode" button
3. Click to enter dashboard
4. Toggle availability
5. View available tasks
6. Check earnings
7. Manage settings

---

## 🎯 Status Indicators

| Status      | Badge Color | Icon | Meaning                            |
| ----------- | ----------- | ---- | ---------------------------------- |
| Not Applied | Gray        | ⚪   | User hasn't applied yet            |
| Pending     | Yellow      | ⏳   | Application under review           |
| Approved    | Green       | ✓    | Approved runner with full access   |
| Rejected    | Red         | ✕    | Application rejected (can reapply) |

---

## 🌟 UI Highlights

### Design Consistency

- Matches existing app theme (light/dark mode)
- Uses consistent color palette
- Reuses existing UI components
- Maintains familiar navigation patterns

### Color Coding

- **Success/Approved**: Green (#10B981)
- **Warning/Pending**: Yellow/Orange (#F59E0B)
- **Error/Rejected**: Red (#EF4444)
- **Primary**: Blue (your brand color)

### Key Interactions

- Smooth transitions between modes
- Clear call-to-action buttons
- Intuitive navigation
- Visual feedback on actions

---

## 📋 Checklist

- [x] User type system with runner status
- [x] Application form with validation
- [x] Profile integration with status display
- [x] Runner dashboard with stats
- [x] Available tasks screen
- [x] Earnings tracking
- [x] Runner settings
- [x] Home screen runner mode button
- [x] State management with persistence
- [x] Navigation structure
- [x] UI consistency
- [x] Documentation

---

## 🔮 Future Enhancements

Ready for implementation:

1. Backend API integration
2. Admin review panel
3. Document upload
4. Real-time task matching
5. In-app messaging
6. Payment gateway integration
7. Advanced analytics
8. Rating system
9. GPS tracking
10. Push notifications

---

## 📞 Support

For questions or issues:

1. Check RUNNER_SYSTEM.md for detailed documentation
2. Review type definitions in `src/core/types/index.ts`
3. Examine store methods in `src/core/stores/authStore.ts`

---

## ✅ Summary

Your app now supports a complete runner ecosystem:

- ✅ Users can apply to become runners
- ✅ Application status tracking
- ✅ Separate runner dashboard
- ✅ Task browsing and acceptance
- ✅ Earnings management
- ✅ Profile and settings
- ✅ Seamless mode switching
- ✅ Persistent data storage

**The system is production-ready for local testing and ready for backend integration!**
