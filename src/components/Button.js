import React from 'react';
import './Button.css';

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  full,
  as: Comp = 'button',
  ...rest
}) {
  const cls = ['mdr-btn', `mdr-btn--${variant}`, `mdr-btn--${size}`, full ? 'mdr-btn--full' : '']
    .filter(Boolean)
    .join(' ');
  return (
    <Comp className={cls} {...rest}>
      {children}
    </Comp>
  );
}
