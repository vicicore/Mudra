import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Button from '../components/Button';
import { useAuth } from '../context/AuthContext';
import './AuthForm.css';

export default function Signup() {
  const [step, setStep] = useState('mobile'); // mobile | otp
  const [mobile, setMobile] = useState('');
  const [otp, setOtp] = useState('');
  const navigate = useNavigate();
  const { completeSignup } = useAuth();

  const mobileValid = /^[6-9]\d{9}$/.test(mobile);
  const otpValid = otp.length === 6;

  function handleSendOtp(e) {
    e.preventDefault();
    if (mobileValid) setStep('otp');
  }

  function handleVerify(e) {
    e.preventDefault();
    if (!otpValid) return;
    completeSignup(mobile);
    navigate('/kyc');
  }

  return (
    <div className="mdr-auth">
      <Header title="Create your account" onBack={() => navigate('/')} />
      <div className="mdr-auth__body">
        {step === 'mobile' ? (
          <form onSubmit={handleSendOtp}>
            <p className="mdr-auth__lead">
              Enter the mobile number linked to your UPI ID. We'll send a one-time code to verify it's you.
            </p>
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
              Already on Mudra? <button type="button" className="mdr-linklike" onClick={() => navigate('/login')}>Log in</button>
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
              Verify & continue
            </Button>
          </form>
        )}
      </div>
    </div>
  );
}
