import React from 'react';

type GlassCardProps = React.HTMLAttributes<HTMLDivElement>;

const GlassCard: React.FC<GlassCardProps> = ({ className = '', children, ...props }) => {
  const classes = `glass-card ${className}`.trim();
  return (
    <div {...props} className={classes}>
      {children}
    </div>
  );
};

export default GlassCard;
