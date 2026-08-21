import React, { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Card from '../components/Card';
import TransactionItem from '../components/TransactionItem';
import { mockTransactions } from '../api/mockData';
import './Transactions.css';

const FILTERS = [
  { id: 'all', label: 'All' },
  { id: 'credit', label: 'Credits' },
  { id: 'debit', label: 'Debits' },
];

export default function Transactions() {
  const navigate = useNavigate();
  const [filter, setFilter] = useState('all');

  const filtered = useMemo(
    () => (filter === 'all' ? mockTransactions : mockTransactions.filter((t) => t.type === filter)),
    [filter]
  );

  const totalIn = mockTransactions.filter((t) => t.type === 'credit').reduce((s, t) => s + t.amount, 0);
  const totalOut = mockTransactions.filter((t) => t.type === 'debit').reduce((s, t) => s + t.amount, 0);

  return (
    <div className="mdr-txp">
      <Header title="Cash flow" subtitle="Last 6 months via Account Aggregator" onBack={() => navigate('/dashboard')} />

      <div className="mdr-txp__summary">
        <div>
          <p className="mdr-txp__sumlabel">Money in</p>
          <p className="mdr-txp__sumvalue is-credit figure">{`\u20b9${totalIn.toLocaleString('en-IN')}`}</p>
        </div>
        <div className="mdr-txp__divider" />
        <div>
          <p className="mdr-txp__sumlabel">Money out</p>
          <p className="mdr-txp__sumvalue figure">{`\u20b9${totalOut.toLocaleString('en-IN')}`}</p>
        </div>
      </div>

      <div className="mdr-txp__filters">
        {FILTERS.map((f) => (
          <button
            key={f.id}
            className={`mdr-txp__filter ${filter === f.id ? 'is-active' : ''}`}
            onClick={() => setFilter(f.id)}
          >
            {f.label}
          </button>
        ))}
      </div>

      <div className="mdr-txp__scroll">
        <Card>
          <ul>
            {filtered.map((tx) => <TransactionItem key={tx.id} tx={tx} />)}
          </ul>
        </Card>
      </div>
    </div>
  );
}
