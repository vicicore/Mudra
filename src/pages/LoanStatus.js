import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Card from '../components/Card';
import Button from '../components/Button';
import { mockLoan } from '../api/mockData';
import './LoanStatus.css';

export default function LoanStatus() {
  const navigate = useNavigate();
  const drawnPct = Math.round((mockLoan.drawn / mockLoan.limit) * 100);
  const repayPct = Math.min(100, Math.round((mockLoan.repaidThisCycle / mockLoan.topUpThreshold) * 100));

  return (
    <div className="mdr-status">
      <Header title="Loan status" subtitle={mockLoan.lender} onBack={() => navigate('/dashboard')} />
      <div className="mdr-status__body">
        <Card className="mdr-status__hero">
          <p className="mdr-status__herolabel">Available to draw</p>
          <p className="mdr-status__herovalue figure">{`\u20b9${mockLoan.available.toLocaleString('en-IN')}`}</p>
          <div className="mdr-status__bar">
            <div className="mdr-status__barfill" style={{ width: `${drawnPct}%` }} />
          </div>
          <div className="mdr-status__barlabels">
            <span>{`\u20b9${mockLoan.drawn.toLocaleString('en-IN')} drawn`}</span>
            <span>{`\u20b9${mockLoan.limit.toLocaleString('en-IN')} limit`}</span>
          </div>
          <Button full>Draw funds</Button>
        </Card>

        <Card>
          <p className="mdr-status__cardtitle">Auto-repayment</p>
          <p className="mdr-status__carddesc">
            {mockLoan.autoRepay.percent}% of every UPI credit is skimmed automatically — no fixed EMI date,
            no missed-payment risk on days you earn less.
          </p>
          <div className="mdr-status__stats">
            <div>
              <p className="mdr-status__statlabel">Rate</p>
              <p className="mdr-status__statvalue figure">{mockLoan.rate}%/mo</p>
            </div>
            <div>
              <p className="mdr-status__statlabel">Collected so far</p>
              <p className="mdr-status__statvalue figure">{`\u20b9${mockLoan.autoRepay.collectedTotal.toLocaleString('en-IN')}`}</p>
            </div>
          </div>
        </Card>

        <Card>
          <div className="mdr-status__topuphead">
            <p className="mdr-status__cardtitle">Top-up progress</p>
            {mockLoan.nextTopUpEligible && <span className="mdr-status__eligible">Eligible now</span>}
          </div>
          <p className="mdr-status__carddesc">
            Repay one-third of your limit to unlock a top-up — just like a revolving Flexi-Loan.
          </p>
          <div className="mdr-status__bar mdr-status__bar--thin">
            <div className="mdr-status__barfill" style={{ width: `${repayPct}%` }} />
          </div>
          <div className="mdr-status__barlabels">
            <span>{`\u20b9${mockLoan.repaidThisCycle.toLocaleString('en-IN')} repaid`}</span>
            <span>{`\u20b9${mockLoan.topUpThreshold.toLocaleString('en-IN')} needed`}</span>
          </div>
          <Button full variant="secondary" disabled={!mockLoan.nextTopUpEligible}>
            Request top-up
          </Button>
        </Card>

        <Card>
          <p className="mdr-status__cardtitle">Disbursal history</p>
          <ul className="mdr-status__disbursals">
            {mockLoan.disbursals.map((d) => (
              <li key={d.id}>
                <div>
                  <p className="mdr-status__dpurpose">{d.purpose}</p>
                  <p className="mdr-status__ddate">
                    {new Date(d.date).toLocaleDateString('en-IN', { day: '2-digit', month: 'short' })}
                  </p>
                </div>
                <span className="figure">{`\u20b9${d.amount.toLocaleString('en-IN')}`}</span>
              </li>
            ))}
          </ul>
        </Card>
      </div>
    </div>
  );
}
