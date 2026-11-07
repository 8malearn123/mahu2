"use client";

import { useEffect, useRef } from "react";

type Mote = { x: number; y: number; vx: number; vy: number; r: number; p: number; s: number };

/** Specks of low sun drifting up over the coast, in the sunset's colours. Cheap 2D canvas, pauses offscreen. */
export function SunMotes({ className, count = 48 }: { className?: string; count?: number }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // One soft sprite, stamped for every mote: warm cream at the heart, orange, then coral to nothing.
    const sprite = document.createElement("canvas");
    sprite.width = sprite.height = 32;
    const sctx = sprite.getContext("2d");
    if (!sctx) return;
    const g = sctx.createRadialGradient(16, 16, 0, 16, 16, 16);
    g.addColorStop(0, "rgba(255,236,204,1)");
    g.addColorStop(0.35, "rgba(239,150,74,0.45)");
    g.addColorStop(1, "rgba(232,102,96,0)");
    sctx.fillStyle = g;
    sctx.fillRect(0, 0, 32, 32);

    let w = 0;
    let h = 0;
    let dpr = 1;
    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = canvas.clientWidth;
      h = canvas.clientHeight;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    const motes: Mote[] = Array.from({ length: count }, () => ({
      x: Math.random(),
      y: Math.random(),
      vx: (Math.random() - 0.5) * 0.00012,
      vy: -(0.00004 + Math.random() * 0.00014),
      r: 0.6 + Math.random() * 2.4,
      p: Math.random() * Math.PI * 2,
      s: 0.4 + Math.random() * 1.2,
    }));

    let visible = false;
    const io = new IntersectionObserver(([entry]) => (visible = entry.isIntersecting));
    io.observe(canvas);

    let raf = 0;
    let last = performance.now();
    const frame = (now: number) => {
      raf = requestAnimationFrame(frame);
      const dt = Math.min(48, now - last);
      last = now;
      if (!visible || document.hidden) return;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, w, h);
      ctx.globalCompositeOperation = "lighter";
      const t = now / 1000;
      for (const m of motes) {
        m.x += m.vx * dt + Math.sin(t * 0.6 + m.p) * 0.00003 * dt;
        m.y += m.vy * dt;
        if (m.y < -0.05) {
          m.y = 1.05;
          m.x = Math.random();
        }
        if (m.x < -0.05) m.x = 1.05;
        if (m.x > 1.05) m.x = -0.05;
        ctx.globalAlpha = 0.45 + 0.55 * Math.sin(t * m.s + m.p) ** 2;
        const size = m.r * 6;
        ctx.drawImage(sprite, m.x * w - size / 2, m.y * h - size / 2, size, size);
      }
      ctx.globalAlpha = 1;
    };
    raf = requestAnimationFrame(frame);
    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
    };
  }, [count]);

  return <canvas ref={ref} className={className} aria-hidden="true" />;
}
