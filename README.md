# TwinTik - Digital Business Card Platform

A modern React application for creating and sharing digital business cards with AI-powered features.

## 🌟 Features

- **Digital Business Cards**: Create beautiful, customizable digital cards
- **Multiple Sharing Options**: QR codes, direct links, and more
- **AI Twin Avatar**: AI-powered digital twin features
- **Analytics Dashboard**: Track views, shares, and lead generation
- **User Authentication**: Secure login and registration
- **Responsive Design**: Works on all devices

## 🚀 Tech Stack

- **React 18** + **TypeScript**
- **Tailwind CSS** for styling
- **React Router v6** for navigation
- **React Hook Form** for form handling
- **Lucide React** for icons

## 📦 Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Open [http://localhost:5173](http://localhost:5173) in your browser.

## 🏗️ Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Header.tsx      # Navigation header
│   └── Footer.tsx      # Site footer
├── pages/              # Page components
│   ├── Home.tsx        # Landing page
│   ├── Login.tsx       # Login page
│   ├── Signup.tsx      # Registration page
│   ├── Dashboard.tsx   # User dashboard
│   └── Pricing.tsx     # Pricing page
├── context/            # React context providers
│   └── AuthContext.tsx # Authentication context
├── types/              # TypeScript type definitions
│   └── index.ts        # Main type definitions
├── utils/              # Utility functions
│   └── index.ts        # Helper functions
└── App.tsx             # Main app component
```

## 🎨 Design System

- **Colors**: Purple/blue gradient theme
- **Typography**: Inter font family
- **Components**: Consistent button variants and cards
- **Responsive**: Mobile-first design

## 🔐 Authentication

- User registration and login
- Protected routes
- Persistent login state
- Form validation

## 📱 Mobile Ready

- Responsive design for all screen sizes
- Touch-friendly interface
- Mobile-optimized navigation

## 🔧 Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
```

## 🎯 User Flow

1. **Visit Homepage** → See features and benefits
2. **Sign Up** → Create account
3. **Dashboard** → Access overview and features
4. **Create Card** → Design digital business card
5. **Share** → Use QR codes or direct links
6. **Track** → Monitor engagement

---

Built with React and TypeScript
