import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Card from '../components/Card';
import Button from '../components/Button';
import ConsentToggle from '../components/ConsentToggle';
import { useAuth } from '../context/AuthContext';
import { mockConsent } from '../api/mockData';
import './Consent.css';

export default function Consent() {
  const navigate = useNavigate();
  const { completeConsent } = useAuth();
  const [processing, setProcessing] = useState(false);

  function approve() {
    setProcessing(true);
    setTimeout(() => {
      completeConsent();
      navigate('/dashboard');
    }, 1600);
  }

  if (processing) {
    return (
      <div className="mdr-consent mdr-consent--loading">
        <div className="mdr-consent__spinner" />
        <p className="mdr-consent__loadingtitle">Reading your cash flow</p>
        <p className="mdr-consent__loadingsub">
          Pulling 6 months of UPI history via {mockConsent.aa} and computing your score…
        </p>
      </div>
    );
  }

  return (
    <div className="mdr-consent">
      <Header title="Share your cash flow" subtitle="Step 3 of 3" onBack={() => navigate('/kyc')} />
      <div className="mdr-consent__body">
        <Card className="mdr-consent__banner">
          <p className="mdr-consent__bannertitle">This is a consent, not a login</p>
          <p className="mdr-consent__bannerdesc">
            Data moves only through the RBI-regulated Account Aggregator framework. Mudra never sees
            your bank credentials, and you can revoke this at any time from your profile.
          </p>
        </Card>

        <Card>
          <ConsentToggle
            label="Bank & UPI transaction history"
            description={mockConsent.dataRange}
            checked
            locked
          />
          <ConsentToggle
            label="Purpose"
            description={mockConsent.purpose}
            checked
            locked
          />
          <ConsentToggle
            label="Fetched from"
            description={mockConsent.fetchedFrom.join(' · ')}
            checked
            locked
          />
        </Card>

        <p className="mdr-consent__meta">
          Consent expires {new Date(mockConsent.expiresOn).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })} unless renewed · Powered by {mockConsent.aa}
        </p>

        <div className="mdr-consent__footer">
          <Button full size="lg" onClick={approve}>Approve & continue</Button>
          <Button full size="lg" variant="ghost" onClick={() => navigate('/kyc')}>Not now</Button>
        </div>
      </div>
    </div>
  );
}
