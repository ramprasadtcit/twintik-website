# TwinTik - Component Structure & Organization

## 📁 **Complete Folder Structure**

```
src/
├── components/                    # Reusable UI components
│   ├── layout/                   # Layout components
│   │   ├── Header.tsx           # Main navigation header
│   │   ├── Footer.tsx           # Site footer
│   │   └── index.ts             # Layout exports
│   ├── ui/                      # Base UI components
│   │   ├── Button.tsx           # Button component variants
│   │   ├── Card.tsx             # Card component
│   │   ├── Badge.tsx            # Badge component
│   │   └── index.ts             # UI exports
│   ├── cards/                   # Digital card components
│   │   ├── DigitalCard.tsx      # Main digital card component
│   │   └── index.ts             # Card exports
│   ├── features/                # Feature-specific components
│   │   └── CardWizard.tsx       # Card creation wizard
│   └── ProtectedRoute.tsx       # Route protection component
│
├── pages/                       # Page components
│   ├── marketing/               # Public marketing pages
│   │   ├── Home.tsx            # Landing page
│   │   ├── Pricing.tsx         # Pricing page
│   │   └── index.ts            # Marketing exports
│   ├── auth/                   # Authentication pages
│   │   ├── Login.tsx           # Login page
│   │   ├── Signup.tsx          # Registration page
│   │   ├── VerifyEmail.tsx     # Email verification
│   │   ├── CompleteProfile.tsx # Profile completion
│   │   └── index.ts            # Auth exports
│   ├── dashboard/              # B2C user dashboard pages
│   │   ├── Dashboard.tsx       # Main dashboard
│   │   ├── Profile.tsx         # Profile management
│   │   ├── CardManagement.tsx  # Card customization
│   │   ├── AITwin.tsx          # AI Twin configuration
│   │   ├── Analytics.tsx       # Analytics dashboard
│   │   ├── Settings.tsx        # Account settings
│   │   └── index.ts            # Dashboard exports
│   ├── organization/           # B2B organization pages
│   │   ├── B2BSubscription.tsx # B2B signup
│   │   ├── OrganizationDashboard.tsx # Org dashboard
│   │   ├── OrganizationCustomization.tsx # Branding
│   │   ├── BotSettings.tsx     # AI bot settings
│   │   ├── BotConfiguration.tsx # AI bot config
│   │   ├── UserManagement.tsx  # Team management
│   │   ├── LeadManagement.tsx  # Lead tracking
│   │   ├── Billing.tsx         # Billing management
│   │   └── index.ts            # Organization exports
│   └── shared/                 # Shared page components
│
├── context/                    # React Context providers
│   └── AuthContext.tsx         # Authentication context
│
├── hooks/                      # Custom React hooks
│
├── types/                      # TypeScript type definitions
│   └── index.ts                # All type definitions
│
├── utils/                      # Utility functions
│   └── index.ts                # All utility functions
│
├── assets/                     # Static assets
│   └── images/                 # Image assets
│
├── App.tsx                     # Main application component
├── main.tsx                    # Application entry point
├── index.css                   # Global styles
└── vite-env.d.ts              # Vite environment types
```

## 🎯 **Organization Principles**

### **1. Feature-Based Organization**
- **Marketing Pages**: Public-facing pages for lead generation
- **Auth Pages**: User authentication and onboarding
- **Dashboard Pages**: B2C user features and management
- **Organization Pages**: B2B team and business features

### **2. Component Hierarchy**
- **Layout Components**: Site-wide layout elements
- **UI Components**: Reusable base components
- **Feature Components**: Specific feature implementations
- **Page Components**: Full page implementations

### **3. Import Structure**
- **Index Files**: Enable clean barrel exports
- **Grouped Imports**: Related components imported together
- **Clear Naming**: Descriptive file and folder names

## 📋 **Component Categories**

### **Layout Components** (`src/components/layout/`)
- **Header**: Main navigation and user menu
- **Footer**: Site footer with links and information
- **Purpose**: Site-wide layout structure

### **UI Components** (`src/components/ui/`)
- **Button**: Primary, secondary, outline, ghost variants
- **Card**: Standard, hover, gradient variants
- **Badge**: Status and category indicators
- **Purpose**: Reusable base UI elements

### **Card Components** (`src/components/cards/`)
- **DigitalCard**: Main digital business card component
- **Purpose**: Core product functionality

### **Feature Components** (`src/components/features/`)
- **CardWizard**: Step-by-step card creation process
- **Purpose**: Complex feature implementations

## 🗂️ **Page Organization**

### **Marketing Pages** (`src/pages/marketing/`)
```
marketing/
├── Home.tsx           # Landing page with hero, features, CTA
├── Pricing.tsx        # Pricing plans and comparison
└── index.ts           # Marketing page exports
```

### **Authentication Pages** (`src/pages/auth/`)
```
auth/
├── Login.tsx          # User login form
├── Signup.tsx         # User registration (B2C & B2B)
├── VerifyEmail.tsx    # Email verification flow
├── CompleteProfile.tsx # Profile completion wizard
└── index.ts           # Auth page exports
```

### **Dashboard Pages** (`src/pages/dashboard/`)
```
dashboard/
├── Dashboard.tsx      # Main B2C dashboard overview
├── Profile.tsx        # Profile management and editing
├── CardManagement.tsx # Digital card customization
├── AITwin.tsx         # AI Twin configuration (Premium)
├── Analytics.tsx      # Analytics dashboard (Premium)
├── Settings.tsx       # Account and app settings
└── index.ts           # Dashboard page exports
```

### **Organization Pages** (`src/pages/organization/`)
```
organization/
├── B2BSubscription.tsx        # B2B signup and plan selection
├── OrganizationDashboard.tsx  # Main B2B dashboard
├── OrganizationCustomization.tsx # Branding and themes
├── BotSettings.tsx            # AI bot configuration
├── BotConfiguration.tsx       # Advanced bot setup
├── UserManagement.tsx         # Team member management
├── LeadManagement.tsx         # Lead tracking and CRM
├── Billing.tsx                # Subscription and billing
└── index.ts                   # Organization page exports
```

## 🔄 **Import Patterns**

### **Clean Barrel Exports**
```typescript
// Instead of multiple imports
import Home from './pages/marketing/Home';
import Pricing from './pages/marketing/Pricing';

// Use grouped imports
import { Home, Pricing } from './pages/marketing';
```

### **Component Imports**
```typescript
// Layout components
import { Header, Footer } from './components/layout';

// UI components
import { Button, Card, Badge } from './components/ui';

// Feature components
import { DigitalCard } from './components/cards';
```

### **Page Imports**
```typescript
// Marketing pages
import { Home, Pricing } from './pages/marketing';

// Auth pages
import { Login, Signup, VerifyEmail, CompleteProfile } from './pages/auth';

// Dashboard pages
import { Dashboard, Profile, CardManagement } from './pages/dashboard';

// Organization pages
import { OrganizationDashboard, UserManagement, Billing } from './pages/organization';
```

## 🎨 **Styling Organization**

### **Global Styles** (`src/index.css`)
- **CSS Variables**: Brand colors and spacing
- **Base Styles**: Typography and layout
- **Component Styles**: Button, card, form styles
- **Utility Classes**: Animations, shadows, gradients

### **Component-Specific Styles**
- **TailwindCSS**: Utility-first styling
- **CSS Modules**: Component-scoped styles (if needed)
- **CSS-in-JS**: Dynamic styling (if needed)

## 📝 **File Naming Conventions**

### **Components**
- **PascalCase**: `DigitalCard.tsx`, `UserManagement.tsx`
- **Descriptive**: Clear, purpose-indicating names
- **Consistent**: Similar components use similar patterns

### **Pages**
- **PascalCase**: `Home.tsx`, `OrganizationDashboard.tsx`
- **Feature-based**: Grouped by functionality
- **Clear hierarchy**: Reflects user journey

### **Utilities**
- **camelCase**: `formatDate.ts`, `validateEmail.ts`
- **Descriptive**: Function names indicate purpose
- **Grouped**: Related functions in same file

## 🚀 **Benefits of This Structure**

### **1. Scalability**
- Easy to add new features
- Clear separation of concerns
- Modular component architecture

### **2. Maintainability**
- Logical file organization
- Clear import patterns
- Consistent naming conventions

### **3. Developer Experience**
- Easy to find files
- Intuitive folder structure
- Clean import statements

### **4. Team Collaboration**
- Clear ownership boundaries
- Consistent patterns
- Easy onboarding

## 🔧 **Adding New Components**

### **New UI Component**
1. Create file in `src/components/ui/`
2. Add to `src/components/ui/index.ts`
3. Import using `import { ComponentName } from './components/ui'`

### **New Page**
1. Create file in appropriate `src/pages/` subfolder
2. Add to corresponding `index.ts`
3. Add route in `src/App.tsx`
4. Import using barrel export

### **New Feature**
1. Create folder in `src/components/features/`
2. Add feature-specific components
3. Create `index.ts` for exports
4. Import in relevant pages

## 📊 **File Size Guidelines**

### **Components**
- **UI Components**: < 100 lines
- **Feature Components**: < 500 lines
- **Page Components**: < 1000 lines

### **Organization**
- **Small files**: Single responsibility
- **Large files**: Break into smaller components
- **Shared logic**: Extract to utilities or hooks

This structure provides a solid foundation for scaling the TwinTik platform while maintaining code quality and developer productivity. 