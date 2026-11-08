import React from 'react';

export interface ChipProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  active?: boolean;
}

export const Chip: React.FC<ChipProps> = ({
  children,
  active = false,
  className = '',
  type = 'button',
  ...rest
}) => {
  const classes = ['chip', active ? 'chip--active' : '', className]
    .filter(Boolean)
    .join(' ');

  return (
    <button type={type} className={classes} {...rest}>
      {children}
    </button>
  );
};
