# Mudra — Frontend Prototype

Mobile-first React frontend for Mudra (SIH 2026, Fintech theme), modeled on the
Tide / iwoca onboarding + lending flow, adapted to UPI + Account Aggregator + OCEN.
See `../FLOW.md` (project root) for the full flow this UI implements.

## Run it

```bash
npm install
npm start
```

Opens at http://localhost:3000. Data is mocked in `src/api/mockData.js` — no
backend required for demo purposes. Swap those calls for real requests against
`../backend` once the API is wired up (see `../docs/03-backend/api-spec.md`).

## Structure

- `src/pages/` — one file per screen, matching the onboarding → dashboard → loan flow:
  `Welcome → Signup → KYC → Consent → Dashboard → Transactions / LoanApplication / LoanStatus / Profile`
- `src/components/` — shared UI: `Header`, `Footer` (bottom tab nav), `Button`, `Card`,
  `ScoreGauge` (the cash-flow score ring), `TransactionItem`, `OfferCard`, `ConsentToggle`
- `src/context/AuthContext.js` — tracks onboarding stage client-side for the prototype
- `src/api/mockData.js` — mock user, score, transactions, NBFC offers, active loan
- `src/index.css` — design tokens (iwoca-brief palette: coral `#FB5950`, navy `#08172C`)

## Design

- Display type: Space Grotesk · Body: Inter · Figures (₹, scores): IBM Plex Mono
- Mobile-first shell (max-width 480px), framed on desktop for demo purposes
- Signature element: the circular cash-flow score gauge on the dashboard
