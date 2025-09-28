import React, { useEffect, useRef } from "react";

// Canvas-based "sparking neurons" field
export default function NeuronField({ className = "", style = {} }) {
  const canvasRef = useRef(null);
  const nodesRef = useRef([]);
  const sparksRef = useRef([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let rafId;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      canvas.style.width = rect.width + "px";
      canvas.style.height = rect.height + "px";
    };
    resize();
    window.addEventListener("resize", resize);

    const createNodes = () => {
      const nodes = [];
      const dpr = window.devicePixelRatio || 1;
      const w = canvas.width / dpr;
      const h = canvas.height / dpr;
      const cx = w / 2, cy = h / 2;

      const rings = [
        { r: Math.min(w, h) * 0.08, n: 10 },
        { r: Math.min(w, h) * 0.15, n: 18 },
        { r: Math.min(w, h) * 0.22, n: 28 },
        { r: Math.min(w, h) * 0.29, n: 36 },
        { r: Math.min(w, h) * 0.36, n: 44 },
        { r: Math.min(w, h) * 0.43, n: 52 },
        { r: Math.min(w, h) * 0.50, n: 48 },
        { r: Math.min(w, h) * 0.57, n: 24 }
      ];

      rings.forEach((ring, idx) => {
        for (let i = 0; i < ring.n; i++) {
          const angle = (i / ring.n) * Math.PI * 2 + Math.random() * 0.5;
          const baseRadius = ring.r + (Math.random() - 0.5) * ring.r * 0.3;
          const ox = 1.0, oy = 0.8; // oval factor
          const x = cx + Math.cos(angle) * baseRadius * ox;
          const y = cy + Math.sin(angle) * baseRadius * oy;
          nodes.push({
            x, y,
            vx: (Math.random() - 0.5) * 0.8,
            vy: (Math.random() - 0.5) * 0.8,
            radius: Math.random() * 2.5 + 1,
            pulsePhase: Math.random() * Math.PI * 2,
            pulseSpeed: Math.random() * 0.03 + 0.015,
            intensity: Math.random() * 0.6 + 0.4,
            lastSpark: 0,
            baseRadius, baseAngle: angle, ringIndex: idx
          });
        }
      });
      nodesRef.current = nodes;
    };

    const spark = (a, b) => {
      const midX = (a.x + b.x) / 2;
      const midY = (a.y + b.y) / 2;
      const d = Math.hypot(b.x - a.x, b.y - a.y);
      const swirl = d * 0.25 * (Math.random() - 0.5);
      sparksRef.current.push({
        startX: a.x, startY: a.y, endX: b.x, endY: b.y,
        progress: 0,
        speed: Math.random() * 0.12 + 0.08,
        intensity: Math.random() * 0.8 + 0.3,
        life: 1, decay: Math.random() * 0.04 + 0.02,
        cp: [
          { x: a.x + (midX - a.x) * 0.3 + swirl, y: a.y + (midY - a.y) * 0.3 - swirl },
          { x: midX + swirl * 1.5, y: midY + swirl },
          { x: b.x + (midX - b.x) * 0.3 - swirl, y: b.y + (midY - b.y) * 0.3 + swirl }
        ]
      });
    };

    const animate = (ts) => {
      const dpr = window.devicePixelRatio || 1;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const nodes = nodesRef.current;
      const sparks = sparksRef.current;
      const w = canvas.width / dpr, h = canvas.height / dpr;
      const cx = w / 2, cy = h / 2;

      nodes.forEach((n, i) => {
        n.baseAngle += 0.0001 + n.ringIndex * 0.00005;
        const ox = 1.0, oy = 0.8;
        n.x += n.vx; n.y += n.vy;

        const tx = cx + Math.cos(n.baseAngle) * n.baseRadius * ox;
        const ty = cy + Math.sin(n.baseAngle) * n.baseRadius * oy;
        n.x += (tx - n.x) * 0.02;
        n.y += (ty - n.y) * 0.02;
        n.vx = n.vx * 0.99 + (Math.random() - 0.5) * 0.05;
        n.vy = n.vy * 0.99 + (Math.random() - 0.5) * 0.05;

        n.pulsePhase += n.pulseSpeed;
        const pulse = Math.sin(n.pulsePhase) * 0.5 + 0.5;
        const r = n.radius + pulse * 1.5;
        const inten = n.intensity + pulse * 0.4;

        // halo
        if (pulse > 0.6) {
          const halo = r * 2.5;
          const g = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, halo);
          g.addColorStop(0, `rgba(82, 246, 197, ${inten * 0.25})`);
          g.addColorStop(0.4, `rgba(82, 246, 197, ${inten * 0.1})`);
          g.addColorStop(1, "rgba(82, 246, 197, 0)");
          ctx.fillStyle = g;
          ctx.beginPath(); ctx.arc(n.x, n.y, halo, 0, Math.PI * 2); ctx.fill();
        }
        // node
        const g2 = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, r);
        g2.addColorStop(0, `rgba(82, 246, 197, ${inten})`);
        g2.addColorStop(1, `rgba(82, 246, 197, ${inten * 0.2})`);
        ctx.fillStyle = g2;
        ctx.beginPath(); ctx.arc(n.x, n.y, r, 0, Math.PI * 2); ctx.fill();

        // occasional sparks
        if (pulse > 0.75 && ts - n.lastSpark > 8000) {
          for (let j = 0; j < nodes.length; j++) {
            if (i === j) continue;
            const m = nodes[j];
            const d = Math.hypot(m.x - n.x, m.y - n.y);
            const op = Math.sin(m.pulsePhase) * 0.5 + 0.5;
            if (d < 120 && d > 30 && op > 0.7 && Math.random() < 0.005) {
              spark(n, m);
              n.lastSpark = ts;
              break;
            }
          }
        }
      });

      // draw sparks
      for (let i = sparks.length - 1; i >= 0; i--) {
        const s = sparks[i];
        s.progress += s.speed;
        s.life -= s.decay;
        if (s.life <= 0 || s.progress >= 1) { sparks.splice(i, 1); continue; }

        ctx.strokeStyle = `rgba(82, 246, 197, ${s.intensity * s.life})`;
        ctx.lineWidth = Math.random() * 1.5 + 0.5;
        ctx.lineCap = "round";
        ctx.beginPath();
        ctx.moveTo(s.startX, s.startY);
        const t = s.progress;
        const [c1, c2, c3] = s.cp;
        if (t < 0.33) {
          const u = t / 0.33;
          ctx.lineTo(s.startX + (c1.x - s.startX) * u, s.startY + (c1.y - s.startY) * u);
        } else if (t < 0.66) {
          const u = (t - 0.33) / 0.33;
          ctx.lineTo(c1.x, c1.y);
          ctx.lineTo(c1.x + (c2.x - c1.x) * u, c1.y + (c2.y - c1.y) * u);
        } else {
          const u = (t - 0.66) / 0.34;
          ctx.lineTo(c1.x, c1.y);
          ctx.lineTo(c2.x, c2.y);
          ctx.lineTo(c3.x, c3.y);
          ctx.lineTo(c3.x + (s.endX - c3.x) * u, c3.y + (s.endY - c3.y) * u);
        }
        ctx.stroke();

        // glow pass
        ctx.shadowColor = "rgba(82, 246, 197, 0.6)";
        ctx.shadowBlur = 8;
        ctx.stroke();
        ctx.shadowColor = "transparent";
        ctx.shadowBlur = 0;
      }

      rafId = requestAnimationFrame(animate);
    };

    createNodes();
    rafId = requestAnimationFrame(animate);
    return () => {
      window.removeEventListener("resize", resize);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  return <canvas ref={canvasRef} className={`w-full h-full ${className}`} style={style} />;
}
