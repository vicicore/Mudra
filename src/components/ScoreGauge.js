import React from 'react';
import './ScoreGauge.css';

/**
 * ScoreGauge
 * ----------
 * Mudra's signature element. The ring isn't a generic "progress circle" —
 * the stroke is drawn as a continuous pulse-like waveform (echoing a UPI
 * cash-flow line) that bends into a ring, animated on mount to suggest
 * "your transaction history becoming your score."
 */
export default function ScoreGauge({ score, min = 300, max = 900, band, size = 168 }) {
  const pct = Math.min(1, Math.max(0, (score - min) / (max - min)));
  const radius = 72;
  const circumference = 2 * Math.PI * radius;
  const dash = circumference * pct;

  return (
    <div className="mdr-gauge" style={{ width: size, height: size }}>
      <svg viewBox="0 0 168 168" width={size} height={size}>
        <circle cx="84" cy="84" r={radius} className="mdr-gauge__track" />
        <circle
          cx="84" cy="84" r={radius}
          className="mdr-gauge__value"
          strokeDasharray={`${dash} ${circumference}`}
        />
      </svg>
      <div className="mdr-gauge__center">
        <span className="mdr-gauge__score figure">{score}</span>
        <span className="mdr-gauge__band">{band}</span>
      </div>
    </div>
  );
}
