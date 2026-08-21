import React, { createContext, useContext, useState, useMemo } from 'react';

/**
 * AuthContext
 * -----------
 * Tracks onboarding progress client-side for the prototype:
 * signup -> KYC -> AA consent -> authenticated.
 * Real implementation swaps this for JWT/session state from
 * backend/controllers/authController.js.
 */

const AuthContext = createContext(null);

const STAGES = {
  LOGGED_OUT: 'logged_out',
  SIGNED_UP: 'signed_up',
  KYC_DONE: 'kyc_done',
  CONSENTED: 'consented',
};

export function AuthProvider({ children }) {
  const [stage, setStage] = useState(STAGES.LOGGED_OUT);
  const [mobile, setMobile] = useState('');

  const value = useMemo(() => ({
    stage,
    STAGES,
    mobile,
    setMobile,
    completeSignup: (num) => { setMobile(num); setStage(STAGES.SIGNED_UP); },
    completeKyc: () => setStage(STAGES.KYC_DONE),
    completeConsent: () => setStage(STAGES.CONSENTED),
    logout: () => setStage(STAGES.LOGGED_OUT),
    isAuthenticated: stage === STAGES.CONSENTED,
  }), [stage, mobile]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
