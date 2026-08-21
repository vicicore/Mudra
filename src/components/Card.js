import React from 'react';
import './Card.css';

export default function Card({ children, className = '', padded = true, onClick, as: Comp = 'div' }) {
  return (
    <Comp
      className={`mdr-card ${padded ? 'mdr-card--padded' : ''} ${className}`}
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
    >
      {children}
    </Comp>
  );
}
