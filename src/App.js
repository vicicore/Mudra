import React from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Footer from './components/Footer';

import Welcome from './pages/Welcome';
import Signup from './pages/Signup';
import Login from './pages/Login';
import KYC from './pages/KYC';
import Consent from './pages/Consent';
import Dashboard from './pages/Dashboard';
import Transactions from './pages/Transactions';
import LoanApplication from './pages/LoanApplication';
import LoanStatus from './pages/LoanStatus';
import Profile from './pages/Profile';

function AppShell({ children, withNav }) {
  return (
    <div className="app-shell">
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minHeight: 0 }}>
        {children}
      </div>
      {withNav && <Footer />}
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <HashRouter>
        <Routes>
          <Route path="/" element={<AppShell><Welcome /></AppShell>} />
          <Route path="/signup" element={<AppShell><Signup /></AppShell>} />
          <Route path="/login" element={<AppShell><Login /></AppShell>} />
          <Route path="/kyc" element={<AppShell><KYC /></AppShell>} />
          <Route path="/consent" element={<AppShell><Consent /></AppShell>} />

          <Route path="/dashboard" element={
            <ProtectedRoute>
              <AppShell withNav><Dashboard /></AppShell>
            </ProtectedRoute>
          } />
          <Route path="/transactions" element={
            <ProtectedRoute>
              <AppShell withNav><Transactions /></AppShell>
            </ProtectedRoute>
          } />
          <Route path="/loan-application" element={
            <ProtectedRoute>
              <AppShell withNav><LoanApplication /></AppShell>
            </ProtectedRoute>
          } />
          <Route path="/loan-status" element={
            <ProtectedRoute>
              <AppShell withNav><LoanStatus /></AppShell>
            </ProtectedRoute>
          } />
          <Route path="/profile" element={
            <ProtectedRoute>
              <AppShell withNav><Profile /></AppShell>
            </ProtectedRoute>
          } />

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </HashRouter>
    </AuthProvider>
  );
}
