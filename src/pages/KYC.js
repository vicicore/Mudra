import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Card from '../components/Card';
import Button from '../components/Button';
import { useAuth } from '../context/AuthContext';
import './KYC.css';

const OCCUPATIONS = [
  { id: 'gig', label: 'Gig / platform worker', hint: 'Pre-fill via e-Shram ID' },
  { id: 'merchant', label: 'Street vendor / micro-merchant', hint: 'Pre-fill via Udyam registration' },
  { id: 'other', label: 'Other', hint: 'Skip pre-fill, verify manually' },
];

export default function KYC() {
  const navigate = useNavigate();
  const { completeKyc } = useAuth();
  const [aadhaarDone, setAadhaarDone] = useState(false);
  const [verifying, setVerifying] = useState(false);
  const [occupation, setOccupation] = useState(null);

  function runAadhaarKyc() {
    setVerifying(true);
    setTimeout(() => {
      setVerifying(false);
      setAadhaarDone(true);
    }, 1100);
  }

  function handleContinue() {
    completeKyc();
    navigate('/consent');
  }

  return (
    <div className="mdr-kyc">
      <Header
        title="Verify your identity"
        subtitle="Step 2 of 3"
        onBack={() => navigate('/signup')}
      />
      <div className="mdr-kyc__body">
        <Card className="mdr-kyc__card">
          <div className="mdr-kyc__row">
            <div className="mdr-kyc__rowtext">
              <p className="mdr-kyc__rowtitle">Aadhaar e-KYC</p>
              <p className="mdr-kyc__rowdesc">Verified via DigiLocker — no document upload needed.</p>
            </div>
            {aadhaarDone ? (
              <span className="mdr-kyc__done">Verified</span>
            ) : (
              <Button size="sm" variant="secondary" onClick={runAadhaarKyc} disabled={verifying}>
                {verifying ? 'Verifying…' : 'Verify'}
              </Button>
            )}
          </div>
        </Card>

        <p className="mdr-kyc__sectiontitle">What best describes your work?</p>
        <p className="mdr-kyc__sectionsub">
          Optional — lets us pre-fill your registration details and speeds up your credit assessment.
        </p>

        <div className="mdr-kyc__options">
          {OCCUPATIONS.map((o) => (
            <Card
              key={o.id}
              className={`mdr-kyc__option ${occupation === o.id ? 'is-selected' : ''}`}
              onClick={() => setOccupation(o.id)}
            >
              <span className="mdr-kyc__optionlabel">{o.label}</span>
              <span className="mdr-kyc__optionhint">{o.hint}</span>
            </Card>
          ))}
        </div>

        <div className="mdr-kyc__footer">
          <Button full size="lg" disabled={!aadhaarDone || !occupation} onClick={handleContinue}>
            Continue
          </Button>
        </div>
      </div>
    </div>
  );
}
