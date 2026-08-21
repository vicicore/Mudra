import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Button from '../components/Button';
import { useAuth } from '../context/AuthContext';
import './AuthForm.css';

export default function Login() {
  const [step, setStep] = useState('mobile');
  const [mobile, setMobile] = useState('');
  const [otp, setOtp] = useState('');
  const navigate = useNavigate();
  const { setMobile: saveMobile, completeSignup, completeKyc, completeConsent } = useAuth();

  const mobileValid = /^[6-9]\d{9}$/.test(mobile);
  const otpValid = otp.length === 6;

  function handleSendOtp(e) {
    e.preventDefault();
    if (mobileValid) setStep('otp');
  }

  function handleVerify(e) {
    e.preventDefault();
    if (!otpValid) return;
    // Returning user: assumed already through KYC + AA consent in a prior session.
    saveMobile(mobile);
    completeSignup(mobile);
    completeKyc();
    completeConsent();
    navigate('/dashboard');
  }

  return (
    <div className="mdr-auth">
      <Header title="Log in" onBack={() => navigate('/')} />
      <div className="mdr-auth__body">
        {step === 'mobile' ? (
          <form onSubmit={handleSendOtp}>
            <p className="mdr-auth__lead">Enter your registered mobile number to continue.</p>
            <label className="mdr-field">
              <span className="mdr-field__label">Mobile number</span>
              <div className="mdr-field__phone">
                <span className="mdr-field__prefix">+91</span>
                <input
                  type="tel"
                  inputMode="numeric"
                  maxLength={10}
                  placeholder="98765 43210"
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value.replace(/\D/g, ''))}
                  autoFocus
                />
              </div>
            </label>
            <Button full size="lg" type="submit" disabled={!mobileValid}>
              Send OTP
            </Button>
            <p className="mdr-auth__switch">
              New to Mudra? <button type="button" className="mdr-linklike" onClick={() => navigate('/signup')}>Create an account</button>
            </p>
          </form>
        ) : (
          <form onSubmit={handleVerify}>
            <p className="mdr-auth__lead">
              Enter the 6-digit code sent to +91 {mobile}. <button type="button" className="mdr-linklike" onClick={() => setStep('mobile')}>Change number</button>
            </p>
            <label className="mdr-field">
              <span className="mdr-field__label">OTP</span>
              <input
                className="mdr-field__otp"
                type="tel"
                inputMode="numeric"
                maxLength={6}
                placeholder="••••••"
                value={otp}
                onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
                autoFocus
              />
            </label>
            <Button full size="lg" type="submit" disabled={!otpValid}>
              Log in
            </Button>
          </form>
        )}
      </div>
    </div>
  );
}
