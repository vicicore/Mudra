import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Card from '../components/Card';
import Button from '../components/Button';
import ConsentToggle from '../components/ConsentToggle';
import { useAuth } from '../context/AuthContext';
import { mockUser, mockConsent } from '../api/mockData';
import './Profile.css';

export default function Profile() {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const [consentOn, setConsentOn] = useState(true);
  const [showRevoke, setShowRevoke] = useState(false);

  function handleLogout() {
    logout();
    navigate('/');
  }

  return (
    <div className="mdr-profile">
      <Header title="Profile" onBack={() => navigate('/dashboard')} />
      <div className="mdr-profile__body">
        <Card className="mdr-profile__identity">
          <div className="mdr-profile__avatar">
            {mockUser.name.split(' ').map((n) => n[0]).slice(0, 2).join('')}
          </div>
          <div>
            <p className="mdr-profile__name">{mockUser.name}</p>
            <p className="mdr-profile__meta">{mockUser.mobile}</p>
            <p className="mdr-profile__meta figure">{mockUser.upiId}</p>
          </div>
        </Card>

        <p className="mdr-profile__sectiontitle">Verification</p>
        <Card>
          <ProfileRow label="Aadhaar e-KYC" status={mockUser.kyc.aadhaar} />
          <ProfileRow label="DigiLocker" status={mockUser.kyc.digilocker} />
          <ProfileRow label="e-Shram ID" status={mockUser.kyc.eshram} />
          <ProfileRow label="Udyam registration" status={mockUser.kyc.udyam} />
        </Card>

        <p className="mdr-profile__sectiontitle">Data & consent</p>
        <Card>
          <ConsentToggle
            label="Account Aggregator sharing"
            description={`${mockConsent.fiTypes.join(', ')} · via ${mockConsent.aa}`}
            checked={consentOn}
            onChange={(v) => (v ? setConsentOn(true) : setShowRevoke(true))}
          />
        </Card>
        {showRevoke && (
          <Card className="mdr-profile__revoke">
            <p className="mdr-profile__revoketitle">Revoke data sharing?</p>
            <p className="mdr-profile__revokedesc">
              Your credit score will stop refreshing and any active loan limit may be paused until you reconsent.
            </p>
            <div className="mdr-profile__revokeactions">
              <Button size="sm" variant="secondary" onClick={() => setShowRevoke(false)}>Keep sharing</Button>
              <Button size="sm" variant="primary" onClick={() => { setConsentOn(false); setShowRevoke(false); }}>
                Revoke
              </Button>
            </div>
          </Card>
        )}

        <Button full size="lg" variant="secondary" onClick={handleLogout} style={{ marginTop: 8 }}>
          Log out
        </Button>
      </div>
    </div>
  );
}

function ProfileRow({ label, status }) {
  const verified = status === 'verified';
  return (
    <div className="mdr-profile__row">
      <span className="mdr-profile__rowlabel">{label}</span>
      <span className={`mdr-profile__rowstatus ${verified ? 'is-verified' : 'is-pending'}`}>
        {verified ? 'Verified' : 'Not linked'}
      </span>
    </div>
  );
}
