import React from 'react';
import './TransactionItem.css';

const TAG_LABEL = { 'auto-repay': 'Auto-repay', savings: 'Savings pot' };

export default function TransactionItem({ tx }) {
  const isCredit = tx.type === 'credit';
  return (
    <li className="mdr-tx">
      <div className={`mdr-tx__icon ${isCredit ? 'is-credit' : 'is-debit'}`}>
        {isCredit ? (
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M8 12.5V3.5M8 3.5 4 7.5M8 3.5l4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg>
        ) : (
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M8 3.5v9M8 12.5l-4-4M8 12.5l4-4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg>
        )}
      </div>
      <div className="mdr-tx__mid">
        <p className="mdr-tx__label">{tx.label}</p>
        <p className="mdr-tx__meta">
          {new Date(tx.date).toLocaleDateString('en-IN', { day: '2-digit', month: 'short' })}
          {tx.tag && <span className="mdr-tx__tag">{TAG_LABEL[tx.tag] || tx.tag}</span>}
        </p>
      </div>
      <span className={`mdr-tx__amount figure ${isCredit ? 'is-credit' : 'is-debit'}`}>
        {`${isCredit ? '+' : '\u2212'}\u20b9${tx.amount.toLocaleString('en-IN')}`}
      </span>
    </li>
  );
}
