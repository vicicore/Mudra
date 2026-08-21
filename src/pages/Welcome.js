import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/Button';
import './Welcome.css';

export default function Welcome() {
  const navigate = useNavigate();
  return (
    <div className="mdr-welcome">
      <div className="mdr-welcome__top">
        <div className="mdr-welcome__mark">
          <MudraMark />
        </div>
        <span className="mdr-welcome__wordmark">Mudra</span>
      </div>

      <div className="mdr-welcome__hero">
        <PulseArt />
        <h1 className="mdr-welcome__headline">
          Credit for what<br />you already earn.
        </h1>
        <p className="mdr-welcome__sub">
          Mudra scores your real UPI cash flow — not a credit bureau file —
          and turns it into an instant, revolving line of working capital.
        </p>
      </div>

      <ul className="mdr-welcome__points">
        <li><CheckDot />No CIBIL history needed</li>
        <li><CheckDot />Consent-based, revocable data sharing via Account Aggregator</li>
        <li><CheckDot />Repay a small % of each UPI payout — never a fixed EMI date</li>
      </ul>

      <div className="mdr-welcome__actions">
        <Button full size="lg" onClick={() => navigate('/signup')}>Get started</Button>
        <Button full size="lg" variant="secondary" onClick={() => navigate('/login')}>
          I already have an account
        </Button>
      </div>
    </div>
  );
}

function MudraMark() {
  return (
    <svg width="30" height="30" viewBox="0 0 30 30" fill="none">
      <rect width="30" height="30" rx="9" fill="#FB5950" />
      <path d="M8 20V10l4.5 6L17 10v10" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M21 10v10" stroke="white" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function CheckDot() {
  return (
    <span className="mdr-welcome__dot">
      <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
        <path d="M2 5.6 4.3 8 9 2.5" stroke="white" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </span>
  );
}

function PulseArt() {
  return (
    <svg className="mdr-welcome__pulse" viewBox="0 0 300 90" fill="none" preserveAspectRatio="none">
      <path
        d="M0 45 H60 L78 15 L96 75 L114 45 L132 60 L150 30 L168 45 H300"
        stroke="#FB5950"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
