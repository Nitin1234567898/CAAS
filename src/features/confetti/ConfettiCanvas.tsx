import React, { useEffect, useRef } from 'react';

type ConfettiParticle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  life: number;
  ttl: number;
  color: string;
};

type Burst = {
  particles: ConfettiParticle[];
};

const COLORS = ['#58d7ff', '#6f8bff', '#6affc6', '#ff6abf', '#ffd36e'];

const ConfettiCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let raf = 0;
    let bursts: Burst[] = [];

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      const width = window.innerWidth;
      const height = window.innerHeight;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const addBurst = (x: number, y: number) => {
      const particles: ConfettiParticle[] = Array.from({ length: 70 }, () => {
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 6 + 3;
        return {
          x,
          y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed - 1.2,
          size: Math.random() * 4 + 2,
          life: 0,
          ttl: Math.random() * 45 + 55,
          color: COLORS[Math.floor(Math.random() * COLORS.length)],
        };
      });

      bursts.push({ particles });
    };

    const render = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      ctx.clearRect(0, 0, width, height);

      bursts = bursts
        .map((burst) => {
          burst.particles = burst.particles.filter((p) => p.life < p.ttl);
          for (const p of burst.particles) {
            p.life += 1;
            p.vx *= 0.985;
            p.vy += 0.16;
            p.x += p.vx;
            p.y += p.vy;
            const alpha = 1 - p.life / p.ttl;
            ctx.fillStyle = p.color;
            ctx.globalAlpha = alpha;
            ctx.fillRect(p.x, p.y, p.size, p.size);
            ctx.globalAlpha = 1;
          }
          return burst;
        })
        .filter((burst) => burst.particles.length > 0);

      raf = window.requestAnimationFrame(render);
    };

    const onConfetti = (event: Event) => {
      const customEvent = event as CustomEvent<{ x?: number; y?: number }>;
      const x = customEvent.detail?.x ?? window.innerWidth / 2;
      const y = customEvent.detail?.y ?? window.innerHeight / 2;
      addBurst(x, y);
    };

    resize();
    render();

    window.addEventListener('resize', resize);
    window.addEventListener('app:confetti', onConfetti as EventListener);

    return () => {
      window.cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
      window.removeEventListener('app:confetti', onConfetti as EventListener);
    };
  }, []);

  return <canvas ref={canvasRef} className="fx-canvas" aria-hidden="true" />;
};

export default ConfettiCanvas;
