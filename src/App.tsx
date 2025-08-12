import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';

// Marketing Pages
import Home from './pages/marketing/Home';
import Pricing from './pages/marketing/Pricing';

// Auth Pages
import Login from './pages/auth/Login';
import Signup from './pages/auth/Signup';
import CompleteProfile from './pages/auth/CompleteProfile';
import ForgotPassword from './pages/auth/ForgotPassword';
import VerifyEmail from './pages/auth/VerifyEmail';
import ResetPassword from './pages/auth/ResetPassword';

// Dashboard Pages
import Dashboard from './pages/dashboard/Dashboard';
import Profile from './pages/dashboard/Profile';
import EditProfile from './pages/dashboard/EditProfile';
import CardManagement from './pages/dashboard/CardManagement';
import AITwin from './pages/dashboard/AITwin';
import Analytics from './pages/dashboard/Analytics';
import Settings from './pages/dashboard/Settings';
import CustomizeCard from './pages/dashboard/CustomizeCard';
import PreviewCard from './pages/dashboard/PreviewCard';
import ShareCard from './pages/dashboard/ShareCard';
import EditCard from './pages/dashboard/EditCard';
import CardAnalytics from './pages/dashboard/CardAnalytics';
import ViewerLogs from './pages/dashboard/ViewerLogs';
import Subscription from './pages/dashboard/Subscription';
import HelpSupport from './pages/dashboard/HelpSupport';
import ChangePassword from './pages/dashboard/ChangePassword';

const App: React.FC = () => {
  return (
    <AuthProvider>
      <Routes>
        {/* Marketing Pages */}
        <Route path="/" element={<Home />} />
        <Route path="/pricing" element={<Pricing />} />
        
        {/* Auth Pages */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/complete-profile" element={<CompleteProfile />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/verify-email" element={<VerifyEmail />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        
        {/* Dashboard Pages */}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/edit-profile" element={<EditProfile />} />
        <Route path="/cards" element={<CardManagement />} />
        <Route path="/ai-twin" element={<AITwin />} />
        <Route path="/analytics" element={<Analytics />} />
        <Route path="/settings" element={<Settings />} />
        
        {/* Card Management Pages */}
        <Route path="/customize-card" element={<CustomizeCard />} />
        <Route path="/customize-card/:id" element={<CustomizeCard />} />
        <Route path="/preview-card" element={<PreviewCard />} />
        <Route path="/share-card" element={<ShareCard />} />
        <Route path="/edit-card/:id" element={<EditCard />} />
        <Route path="/card-analytics/:id" element={<CardAnalytics />} />
        
        {/* Settings & Support Pages */}
        <Route path="/viewer-logs" element={<ViewerLogs />} />
        <Route path="/subscription" element={<Subscription />} />
        <Route path="/help" element={<HelpSupport />} />
        <Route path="/change-password" element={<ChangePassword />} />
      </Routes>
    </AuthProvider>
  );
};

export default App;
