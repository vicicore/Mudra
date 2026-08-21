import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Card from '../components/Card';
import Button from '../components/Button';
import OfferCard from '../components/OfferCard';
import { mockOffers, mockScore } from '../api/mockData';
import './LoanApplication.css';

export default function LoanApplication() {
  const navigate = useNavigate();
  const [selectedId, setSelectedId] = useState(mockOffers.find((o) => o.recommended)?.id || mockOffers[0].id);
  const [accepted, setAccepted] = useState(null);

  function handleAccept(offer) {
    setAccepted(offer);
  }

  if (accepted) {
    return (
      <div className="mdr-loanapp mdr-loanapp--success">
        <div className="mdr-loanapp__check">
          <svg width="30" height="30" viewBox="0 0 30 30" fill="none">
            <path d="M6 15.5 12 21 24 8" stroke="white" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <h2 className="mdr-loanapp__successtitle">Offer accepted</h2>
        <p className="mdr-loanapp__successdesc">
          Your {`\u20b9${accepted.limit.toLocaleString('en-IN')}`} limit from {accepted.lender} is ready.
          Funds disburse straight to your UPI ID — no new account needed.
        </p>
        <Button full size="lg" onClick={() => navigate('/loan-status')}>View loan status</Button>
      </div>
    );
  }

  return (
    <div className="mdr-loanapp">
      <Header title="Loan offers" subtitle={`Based on your score of ${mockScore.score}`} onBack={() => navigate('/dashboard')} />
      <div className="mdr-loanapp__body">
        <Card className="mdr-loanapp__intro">
          <p className="mdr-loanapp__introtitle">Sourced via OCEN</p>
          <p className="mdr-loanapp__introdesc">
            These offers come from NBFC partners on the Open Credit Enablement Network, pre-qualified
            against your cash-flow score — no hard credit inquiry.
          </p>
        </Card>

        {mockOffers.map((offer) => (
          <OfferCard
            key={offer.id}
            offer={offer}
            selected={selectedId === offer.id}
            onSelect={setSelectedId}
            onAccept={handleAccept}
          />
        ))}
      </div>
    </div>
  );
}
