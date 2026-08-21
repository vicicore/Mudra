/**
 * mockData.js
 * -----------
 * Stand-in for backend + credit-engine calls (see /backend and /credit-engine)
 * so the frontend prototype is fully demo-able without a live server.
 * Swap these for real fetch() calls against the Express API once wired up —
 * see docs/03-backend/api-spec.md and docs/04-credit-engine/credit-engine-api.md.
 */

export const mockUser = {
  name: 'Ramesh Kumar',
  role: 'Delivery Partner',
  platform: 'Swiggy',
  upiId: 'ramesh.kumar@okhdfcbank',
  mobile: '+91 98765 43210',
  kyc: {
    aadhaar: 'verified',
    digilocker: 'verified',
    eshram: 'verified',
    udyam: null,
  },
};

export const mockScore = {
  score: 742,
  band: 'Good',
  maxScore: 900,
  minScore: 300,
  limit: 25000,
  drawn: 9000,
  available: 16000,
  rate: 1.6, // % per month, pay-as-you-use
  updatedAt: '2026-08-20T09:00:00+05:30',
  factors: [
    { label: 'Income regularity', value: 88, note: '6 of 6 months with steady UPI credit' },
    { label: 'Average balance', value: 71, note: 'Healthy buffer between payouts' },
    { label: 'Transaction volume', value: 79, note: '412 UPI transactions in 6 months' },
    { label: 'Repayment history', value: 95, note: 'No missed auto-repay cycles' },
  ],
};

export const mockConsent = {
  fiTypes: ['Bank transactions', 'UPI transaction history'],
  purpose: 'Cash-flow based credit scoring for a Mudra loan offer',
  dataRange: 'Last 6 months, refreshed monthly',
  expiresOn: '2027-02-20',
  aa: 'Setu AA (Sahamati-governed Account Aggregator)',
  fetchedFrom: ['HDFC Bank', 'UPI (BHIM)'],
};

export const mockTransactions = [
  { id: 't1', date: '2026-08-19', label: 'Swiggy payout', type: 'credit', amount: 1840 },
  { id: 't2', date: '2026-08-19', label: 'Repayment auto-debit', type: 'debit', amount: 92, tag: 'auto-repay' },
  { id: 't3', date: '2026-08-18', label: 'Swiggy payout', type: 'credit', amount: 2210 },
  { id: 't4', date: '2026-08-18', label: 'Repayment auto-debit', type: 'debit', amount: 110, tag: 'auto-repay' },
  { id: 't5', date: '2026-08-17', label: 'Grocery — Kirana Store', type: 'debit', amount: 650 },
  { id: 't6', date: '2026-08-17', label: 'Swiggy payout', type: 'credit', amount: 1975 },
  { id: 't7', date: '2026-08-16', label: 'Mobile recharge', type: 'debit', amount: 299 },
  { id: 't8', date: '2026-08-16', label: 'Swiggy payout', type: 'credit', amount: 2040 },
  { id: 't9', date: '2026-08-15', label: 'Auto-save pot', type: 'debit', amount: 100, tag: 'savings' },
  { id: 't10', date: '2026-08-15', label: 'Swiggy payout', type: 'credit', amount: 1690 },
];

export const mockOffers = [
  {
    id: 'o1',
    lender: 'Vivriti Capital (NBFC)',
    limit: 25000,
    rate: 1.6,
    type: 'Revolving working-capital limit',
    recommended: true,
    note: 'Best match for irregular daily payouts — pay-as-you-use interest.',
  },
  {
    id: 'o2',
    lender: 'NeoGrowth (NBFC)',
    limit: 20000,
    rate: 1.9,
    type: 'Revolving working-capital limit',
    recommended: false,
    note: 'Slightly lower limit, faster top-up cycle.',
  },
  {
    id: 'o3',
    lender: 'FlexiBank NBFC',
    limit: 18000,
    rate: 1.75,
    type: 'Fixed 6-month term loan',
    recommended: false,
    note: 'Fixed EMI — not income-linked. Less suited to daily payouts.',
  },
];

export const mockLoan = {
  status: 'active',
  lender: 'Vivriti Capital (NBFC)',
  limit: 25000,
  drawn: 9000,
  available: 16000,
  rate: 1.6,
  repaidThisCycle: 6200,
  topUpThreshold: 8333, // one-third of limit
  nextTopUpEligible: true,
  disbursals: [
    { id: 'd1', date: '2026-08-02', amount: 5000, purpose: 'Vehicle service' },
    { id: 'd2', date: '2026-08-10', amount: 4000, purpose: 'Working capital' },
  ],
  autoRepay: {
    percent: 5,
    collectedTotal: 6200,
  },
};

export const mockSavings = {
  potBalance: 3400,
  monthlyTarget: 1500,
  streakWeeks: 6,
};
