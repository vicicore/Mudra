import React from 'react';
import { NavLink } from 'react-router-dom';
import './Footer.css';

const TABS = [
  { to: '/dashboard', label: 'Home', icon: HomeIcon },
  { to: '/transactions', label: 'Cash flow', icon: PulseIcon },
  { to: '/loan-status', label: 'Loan', icon: WalletIcon },
  { to: '/profile', label: 'Profile', icon: UserIcon },
];

export default function Footer() {
  return (
    <nav className="mdr-nav" aria-label="Primary">
      {TABS.map(({ to, label, icon: Icon }) => (
        <NavLink
          key={to}
          to={to}
          className={({ isActive }) => 'mdr-nav__item' + (isActive ? ' is-active' : '')}
        >
          <Icon />
          <span>{label}</span>
        </NavLink>
      ))}
    </nav>
  );
}

function HomeIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <path d="M3 9.5 10 3l7 6.5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M5 8.5V16.5a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V8.5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}
function PulseIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <path d="M2 10.5h3.2l1.6-4.5 3 9 2-6.5 1.4 2h4.8" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}
function WalletIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <rect x="2.5" y="5.5" width="15" height="10.5" rx="2" stroke="currentColor" strokeWidth="1.7"/>
      <path d="M12.5 10.75a1 1 0 1 0 2 0 1 1 0 0 0-2 0Z" fill="currentColor"/>
      <path d="M2.5 8.2h15" stroke="currentColor" strokeWidth="1.7"/>
    </svg>
  );
}
function UserIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <circle cx="10" cy="6.7" r="3.2" stroke="currentColor" strokeWidth="1.7"/>
      <path d="M3.5 17c1.2-3.4 4-5 6.5-5s5.3 1.6 6.5 5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round"/>
    </svg>
  );
}
