import React from 'react';

type GlassButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'secondary' | 'danger';
};

const GlassButton: React.FC<GlassButtonProps> = ({
  variant = 'secondary',
  className = '',
  children,
  ...props
}) => {
  const classes = `glass-button glass-button--${variant} ${className}`.trim();
  return (
    <button {...props} className={classes}>
      {children}
    </button>
  );
};

export default GlassButton;
