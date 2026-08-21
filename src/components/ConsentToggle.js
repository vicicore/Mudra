import React from 'react';
import './ConsentToggle.css';

export default function ConsentToggle({ label, description, checked, onChange, locked }) {
  return (
    <div className="mdr-consent-row">
      <div className="mdr-consent-row__text">
        <p className="mdr-consent-row__label">{label}</p>
        {description && <p className="mdr-consent-row__desc">{description}</p>}
      </div>
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        disabled={locked}
        className={`mdr-toggle ${checked ? 'is-on' : ''}`}
        onClick={() => onChange && onChange(!checked)}
      >
        <span className="mdr-toggle__thumb" />
      </button>
    </div>
  );
}
