import React from 'react';
import Card from './Card';
import Button from './Button';
import './OfferCard.css';

export default function OfferCard({ offer, selected, onSelect, onAccept }) {
  return (
    <Card
      className={`mdr-offer ${selected ? 'is-selected' : ''}`}
      onClick={() => onSelect(offer.id)}
    >
      {offer.recommended && <span className="mdr-offer__badge">Best match</span>}
      <div className="mdr-offer__top">
        <div>
          <p className="mdr-offer__lender">{offer.lender}</p>
          <p className="mdr-offer__type">{offer.type}</p>
        </div>
        <div className="mdr-offer__radio" aria-hidden="true">
          {selected && <span />}
        </div>
      </div>

      <div className="mdr-offer__stats">
        <div>
          <p className="mdr-offer__stat-label">Limit</p>
          <p className="mdr-offer__stat-value figure">{`\u20b9${offer.limit.toLocaleString('en-IN')}`}</p>
        </div>
        <div>
          <p className="mdr-offer__stat-label">Rate</p>
          <p className="mdr-offer__stat-value figure">{offer.rate}%/mo</p>
        </div>
      </div>

      <p className="mdr-offer__note">{offer.note}</p>

      {selected && (
        <Button
          full
          size="sm"
          onClick={(e) => { e.stopPropagation(); onAccept(offer); }}
        >
          Accept this offer
        </Button>
      )}
    </Card>
  );
}
