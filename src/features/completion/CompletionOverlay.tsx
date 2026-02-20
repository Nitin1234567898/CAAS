import React, { useEffect } from 'react';
import GlassCard from '../../components/GlassCard';

type CompletionOverlayProps = {
  open: boolean;
  title: string;
  subtitle: string;
  duration?: number;
  onDone: () => void;
};

const CompletionOverlay: React.FC<CompletionOverlayProps> = ({
  open,
  title,
  subtitle,
  onDone,
  duration = 2200,
}) => {
  useEffect(() => {
    if (!open) return;
    const timer = window.setTimeout(onDone, duration);
    return () => window.clearTimeout(timer);
  }, [open, onDone, duration]);

  if (!open) return null;

  return (
    <div className="completion-overlay" aria-live="polite">
      <div className="completion-overlay__grid" />
      <div className="completion-overlay__rings" />
      <GlassCard className="completion-overlay__card">
        <h2 className="completion-overlay__title">{title}</h2>
        <p>{subtitle}</p>
      </GlassCard>
    </div>
  );
};

export default CompletionOverlay;
