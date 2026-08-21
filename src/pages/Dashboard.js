import React from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '../components/Card';
import Button from '../components/Button';
import ScoreGauge from '../components/ScoreGauge';
import TransactionItem from '../components/TransactionItem';
import { mockUser, mockScore, mockTransactions, mockSavings } from '../api/mockData';
import './Dashboard.css';

export default function Dashboard() {
  const navigate = useNavigate();
  const recent = mockTransactions.slice(0, 4);

  return (
    <div className="mdr-dash">
      <div className="mdr-dash__topbar">
        <div>
          <p className="mdr-dash__greeting">Namaste, {mockUser.name.split(' ')[0]}</p>
          <p className="mdr-dash__role">{mockUser.role} · {mockUser.platform}</p>
        </div>
        <button className="mdr-dash__avatar" onClick={() => navigate('/profile')} aria-label="Profile">
          {mockUser.name.split(' ').map((n) => n[0]).slice(0, 2).join('')}
        </button>
      </div>

      <div className="mdr-dash__scroll">
        <Card className="mdr-dash__scorecard">
          <div className="mdr-dash__scoretop">
            <div>
              <p className="mdr-dash__scorelabel">Your cash-flow score</p>
              <p className="mdr-dash__scoreupdated">
                Updated {new Date(mockScore.updatedAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}
              </p>
            </div>
          </div>
          <div className="mdr-dash__gaugewrap">
            <ScoreGauge score={mockScore.score} band={mockScore.band} />
            <div className="mdr-dash__limits">
              <div>
                <p className="mdr-dash__limitlabel">Available</p>
                <p className="mdr-dash__limitvalue figure">{`\u20b9${mockScore.available.toLocaleString('en-IN')}`}</p>
              </div>
              <div>
                <p className="mdr-dash__limitlabel">Total limit</p>
                <p className="mdr-dash__limitvalue figure">{`\u20b9${mockScore.limit.toLocaleString('en-IN')}`}</p>
              </div>
            </div>
          </div>
          <Button full onClick={() => navigate('/loan-application')}>See loan offers</Button>
        </Card>

        <div className="mdr-dash__quick">
          <button className="mdr-dash__quickitem" onClick={() => navigate('/loan-status')}>
            <QuickIcon type="loan" />
            <span>Loan status</span>
          </button>
          <button className="mdr-dash__quickitem" onClick={() => navigate('/transactions')}>
            <QuickIcon type="cashflow" />
            <span>Cash flow</span>
          </button>
          <button className="mdr-dash__quickitem" onClick={() => navigate('/profile')}>
            <QuickIcon type="consent" />
            <span>Manage consent</span>
          </button>
        </div>

        <Card className="mdr-dash__savings">
          <div>
            <p className="mdr-dash__savingstitle">Auto-save pot</p>
            <p className="mdr-dash__savingsdesc">{mockSavings.streakWeeks}-week saving streak — keep it going.</p>
          </div>
          <p className="mdr-dash__savingsvalue figure">{`\u20b9${mockSavings.potBalance.toLocaleString('en-IN')}`}</p>
        </Card>

        <div className="mdr-dash__section">
          <div className="mdr-dash__sectionhead">
            <p className="mdr-dash__sectiontitle">Recent activity</p>
            <button className="mdr-dash__seeall" onClick={() => navigate('/transactions')}>See all</button>
          </div>
          <Card>
            <ul>
              {recent.map((tx) => <TransactionItem key={tx.id} tx={tx} />)}
            </ul>
          </Card>
        </div>
      </div>
    </div>
  );
}

function QuickIcon({ type }) {
  const paths = {
    loan: <path d="M4 17V8l6-4 6 4v9M4 17h12M4 17H2m14 0h2" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />,
    cashflow: <path d="M2 11h3.5l1.8-5 3.2 10 2.2-7 1.5 2h4.8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />,
    consent: <path d="M10 2 3 5v5c0 4.2 3 6.9 7 8 4-1.1 7-3.8 7-8V5l-7-3Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />,
  };
  return <svg width="20" height="20" viewBox="0 0 20 20" fill="none">{paths[type]}</svg>;
}
