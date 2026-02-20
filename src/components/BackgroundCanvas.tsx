import React, { useEffect, useRef } from 'react';

type Particle = {
  x: number;
  y: number;
  homeX: number;
  homeY: number;
  vx: number;
  vy: number;
  size: number;
};

const LINK_DISTANCE = 120;
const REPULSE_RADIUS = 180;
const TARGET_FPS = 45;
type QualityTier = 'reduced' | 'low' | 'medium' | 'high';

const BackgroundCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let raf = 0;
    let lastFrameTime = 0;
    let particles: Particle[] = [];
    let isVisible = !document.hidden;
    let quality: QualityTier = 'medium';
    let linkDistance = LINK_DISTANCE;
    let repulseRadius = REPULSE_RADIUS;
    let targetFps = TARGET_FPS;
    let gridSize = LINK_DISTANCE;
    const mouse = { x: -1000, y: -1000, active: false };

    const getQualityTier = (): QualityTier => {
      const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (reducedMotion) return 'reduced';

      const nav = navigator as Navigator & { deviceMemory?: number };
      const cores = nav.hardwareConcurrency || 4;
      const memory = nav.deviceMemory ?? 4;
      const pixels = window.innerWidth * window.innerHeight;

      if (cores >= 8 && memory >= 8 && pixels <= 3000000) return 'high';
      if (cores <= 2 || memory <= 2) return 'low';
      return 'medium';
    };

    const getConfig = (tier: QualityTier) => {
      if (tier === 'reduced') {
        return {
          particleDivisor: 26000,
          minParticles: 40,
          maxParticles: 70,
          linkDistance: 78,
          repulseRadius: 120,
          fps: 26,
        };
      }
      if (tier === 'low') {
        return {
          particleDivisor: 21000,
          minParticles: 55,
          maxParticles: 95,
          linkDistance: 90,
          repulseRadius: 140,
          fps: 34,
        };
      }
      if (tier === 'high') {
        return {
          particleDivisor: 10500,
          minParticles: 140,
          maxParticles: 260,
          linkDistance: 140,
          repulseRadius: 210,
          fps: 58,
        };
      }
      return {
        particleDivisor: 15000,
        minParticles: 90,
        maxParticles: 180,
        linkDistance: 120,
        repulseRadius: 180,
        fps: 45,
      };
    };

    const initParticles = () => {
      const dpr = window.devicePixelRatio || 1;
      const width = window.innerWidth;
      const height = window.innerHeight;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      quality = getQualityTier();
      const cfg = getConfig(quality);
      linkDistance = cfg.linkDistance;
      repulseRadius = cfg.repulseRadius;
      targetFps = cfg.fps;
      gridSize = cfg.linkDistance;

      const count = Math.max(
        cfg.minParticles,
        Math.min(cfg.maxParticles, Math.floor((width * height) / cfg.particleDivisor))
      );
      particles = Array.from({ length: count }, () => {
        const x = Math.random() * width;
        const y = Math.random() * height;
        return {
          x,
          y,
          homeX: x,
          homeY: y,
          vx: 0,
          vy: 0,
          size: Math.random() * 1.7 + 0.7,
        };
      });
    };

    const draw = (time: number) => {
      raf = window.requestAnimationFrame(draw);
      if (!isVisible) return;
      if (time - lastFrameTime < 1000 / targetFps) return;
      lastFrameTime = time;

      const width = window.innerWidth;
      const height = window.innerHeight;

      ctx.clearRect(0, 0, width, height);

      const gradient = ctx.createLinearGradient(0, 0, width, height);
      gradient.addColorStop(0, 'rgba(4, 16, 42, 0.66)');
      gradient.addColorStop(0.55, 'rgba(2, 8, 24, 0.72)');
      gradient.addColorStop(1, 'rgba(1, 4, 14, 0.86)');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);

      const grid = new Map<string, number[]>();
      for (let i = 0; i < particles.length; i += 1) {
        const p = particles[i];
        const gx = Math.floor(p.x / gridSize);
        const gy = Math.floor(p.y / gridSize);
        const key = `${gx},${gy}`;
        const bucket = grid.get(key);
        if (bucket) {
          bucket.push(i);
        } else {
          grid.set(key, [i]);
        }
      }

      for (let i = 0; i < particles.length; i += 1) {
        const p = particles[i];

        let ax = (p.homeX - p.x) * 0.023;
        let ay = (p.homeY - p.y) * 0.023;

        if (mouse.active) {
          const dx = p.x - mouse.x;
          const dy = p.y - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy) || 1;
          if (dist < repulseRadius) {
            const power = ((repulseRadius - dist) / repulseRadius) * 1.4;
            ax += (dx / dist) * power;
            ay += (dy / dist) * power;
          }
        }

        p.vx = (p.vx + ax) * 0.89;
        p.vy = (p.vy + ay) * 0.89;
        p.x += p.vx;
        p.y += p.vy;

        ctx.beginPath();
        ctx.fillStyle = 'rgba(137, 214, 255, 0.85)';
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();

        const gx = Math.floor(p.x / gridSize);
        const gy = Math.floor(p.y / gridSize);
        for (let ox = -1; ox <= 1; ox += 1) {
          for (let oy = -1; oy <= 1; oy += 1) {
            const key = `${gx + ox},${gy + oy}`;
            const cell = grid.get(key);
            if (!cell) continue;
            for (let index = 0; index < cell.length; index += 1) {
              const j = cell[index];
              if (j <= i) continue;
              const q = particles[j];
              const dx = p.x - q.x;
              const dy = p.y - q.y;
              const dist = Math.sqrt(dx * dx + dy * dy);
              if (dist <= linkDistance) {
                const alpha = (1 - dist / linkDistance) * 0.22;
                ctx.strokeStyle = `rgba(118, 189, 255, ${alpha})`;
                ctx.lineWidth = 1;
                ctx.beginPath();
                ctx.moveTo(p.x, p.y);
                ctx.lineTo(q.x, q.y);
                ctx.stroke();
              }
            }
          }
        }
      }
    };

    const onResize = () => initParticles();
    const onMouseMove = (event: MouseEvent) => {
      mouse.x = event.clientX;
      mouse.y = event.clientY;
      mouse.active = true;
    };
    const onMouseLeave = () => {
      mouse.active = false;
    };
    const onVisibilityChange = () => {
      isVisible = !document.hidden;
    };

    initParticles();
    raf = window.requestAnimationFrame(draw);

    window.addEventListener('resize', onResize);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseout', onMouseLeave);
    document.addEventListener('visibilitychange', onVisibilityChange);

    return () => {
      window.cancelAnimationFrame(raf);
      window.removeEventListener('resize', onResize);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseout', onMouseLeave);
      document.removeEventListener('visibilitychange', onVisibilityChange);
    };
  }, []);

  return <canvas ref={canvasRef} className="background-canvas" aria-hidden="true" />;
};

export default BackgroundCanvas;
