import React from 'react';
import './Header.css';

export default function Header({ title, subtitle, onBack, right }) {
  return (
    <header className="mdr-header">
      <div className="mdr-header__left">
        {onBack && (
          <button className="mdr-header__back" onClick={onBack} aria-label="Go back">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M12.5 15.8 6.7 10l5.8-5.8" stroke="#08172C" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        )}
        <div>
          <h1 className="mdr-header__title">{title}</h1>
          {subtitle && <p className="mdr-header__subtitle">{subtitle}</p>}
        </div>
      </div>
      {right && <div className="mdr-header__right">{right}</div>}
    </header>
  );
}
