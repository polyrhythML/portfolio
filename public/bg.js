/* Neuron field — oval layout, mid-wide spread, gentle rotation, and a soft cutout under #hero-bubble */
(() => {
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d", { alpha: true });
  Object.assign(canvas.style, {
    position: "fixed",
    inset: "0",
    width: "100vw",
    height: "100vh",
    zIndex: "0",
    pointerEvents: "none",
  });
  document.body.appendChild(canvas);

  
  // Toggle spark arcs in the neuron field
  const SPARKS_ENABLED = false;
const DPR = () => window.devicePixelRatio || 1;
  function resize() {
    const dpr = DPR();
    canvas.width  = Math.floor(innerWidth * dpr);
    canvas.height = Math.floor(innerHeight * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }
  resize();
  addEventListener("resize", resize, { passive: true });

  // Color
  const C = { r: 82, g: 246, b: 197 };
  const rgba = (a) => `rgba(${C.r}, ${C.g}, ${C.b}, ${a})`;

  // Adaptive oval scaling
  function ovalScale(strength = 0.38) {
    const aspect = innerWidth / innerHeight;
    const a = Math.max(-1, Math.min(1, (aspect - 1)));
    const ox = 1 + Math.max(0,  a) * strength; // stretch X on wide
    const oy = 1 - Math.max(0, -a) * strength; // stretch Y on tall
    return { ox, oy };
  }

  // Rounded-rect helper
  function roundRectPath(ctx, x, y, w, h, r) {
    const rr = Math.max(0, Math.min(r, Math.min(w, h) / 2));
    ctx.beginPath();
    ctx.moveTo(x + rr, y);
    ctx.arcTo(x + w, y,     x + w, y + h, rr);
    ctx.arcTo(x + w, y + h, x,     y + h, rr);
    ctx.arcTo(x,     y + h, x,     y,     rr);
    ctx.arcTo(x,     y,     x + w, y,     rr);
    ctx.closePath();
  }

  // Get hero bubble rect (for masking)
  function getBubbleRect(pad = 14) {
    const el = document.getElementById("hero-bubble");
    if (!el) return null;
    const r = el.getBoundingClientRect();
    return {
      x: r.left - pad,
      y: r.top  - pad,
      w: r.width  + pad * 2,
      h: r.height + pad * 2,
      radius: 18 // soft corners for the cutout
    };
  }

  const state = { nodes: [], sparks: [] };

  function initNodes() {
    state.nodes = [];
    const w = innerWidth, h = innerHeight;
    const cx = w / 2, cy = h / 2;
    const minSide = Math.min(w, h);

    // Spread you liked
    const maxR = (minSide * 0.5) * 1.12;

    // Density tuned for that spread (lower number => more points)
    const BASE_STAR_AREA = 12500;
    const total = Math.max(260, Math.floor((w * h) / BASE_STAR_AREA));

    for (let i = 0; i < total; i++) {
      const angle  = Math.random() * Math.PI * 2;
      const radius = Math.sqrt(Math.random()) * maxR;

      const x = cx + Math.cos(angle) * radius;
      const y = cy + Math.sin(angle) * radius;

      state.nodes.push({
        angle,
        radius,
        angVel: (Math.random() * 0.00045 + 0.00018), // gentle
        ox: 1.0, oy: 1.0,

        x, y,
        vx: (Math.random() - 0.5) * 0.08,
        vy: (Math.random() - 0.5) * 0.08,

        r: Math.random() * 1.8 + 0.9,
        phase: Math.random() * Math.PI * 2,
        speed: Math.random() * 0.020 + 0.010,
        glow: Math.random() * 0.35 + 0.2,
        lastSpark: 0,
      });
    }
  }

  function /* addSpark disabled */ addSpark(a, b) {
    const midX = (a.x + b.x) / 2, midY = (a.y + b.y) / 2;
    const d = Math.hypot(b.x - a.x, b.y - a.y);
    const swirl = d * 0.18 * (Math.random() - 0.5);
    state.sparks.push({
      start: { x: a.x, y: a.y },
      end:   { x: b.x, y: b.y },
      cp: [
        { x: a.x + (midX - a.x) * 0.35 + swirl, y: a.y + (midY - a.y) * 0.35 - swirl },
        { x: midX + swirl * 1.2, y: midY + swirl * 0.8 },
        { x: b.x + (midX - b.x) * 0.35 - swirl, y: b.y + (midY - b.y) * 0.35 + swirl }
      ],
      t: 0,
      v: Math.random() * 0.10 + 0.06,
      life: 1,
      decay: Math.random() * 0.035 + 0.018,
      intensity: Math.random() * 0.6 + 0.25
    });
  }

  function lerpPt(a, b, t){ return { x: a.x + (b.x - a.x) * t, y: a.y + (b.y - a.y) * t }; }

  function step(ts) {
    const w = innerWidth, h = innerHeight;
    const cx = w / 2, cy = h / 2;
    ctx.clearRect(0, 0, w, h);

    const oval = ovalScale(0.38);

    // nodes
    for (const n of state.nodes) {
      n.ox = oval.ox; n.oy = oval.oy;

      n.angle += n.angVel;
      const tx = cx + Math.cos(n.angle) * n.radius * n.ox;
      const ty = cy + Math.sin(n.angle) * n.radius * n.oy;

      n.vx = n.vx * 0.986 + (tx - n.x) * 0.018 + (Math.random() - 0.5) * 0.0025;
      n.vy = n.vy * 0.986 + (ty - n.y) * 0.018 + (Math.random() - 0.5) * 0.0025;
      n.x += n.vx; n.y += n.vy;

      n.phase += n.speed;
      const pulse = (Math.sin(n.phase) + 1) * 0.5;
      const rr = n.r + pulse * 1.0;
      const glow = n.glow + pulse * 0.25;

      // halo
      const halo = rr * 2.6;
      const g = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, halo);
      g.addColorStop(0, rgba(glow * 0.18));
      g.addColorStop(0.5, rgba(glow * 0.06));
      g.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = g;
      ctx.beginPath(); ctx.arc(n.x, n.y, halo, 0, Math.PI * 2); ctx.fill();

      // core
      const g2 = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, rr);
      g2.addColorStop(0, rgba(glow));
      g2.addColorStop(1, rgba(glow * 0.2));
      ctx.fillStyle = g2;
      ctx.beginPath(); ctx.arc(n.x, n.y, rr, 0, Math.PI * 2); ctx.fill();

      // uniform spark chance
      if (pulse > 0.72 && ts - n.lastSpark > 1600 && Math.random() < 0.008) {
        let cand = null, best = 1e9;
        for (const m of state.nodes) {
          if (m === n) continue;
          const d = Math.hypot(m.x - n.x, m.y - n.y);
          if (d < 240 && d > 40 && d < best) { best = d; cand = m; }
        }
        if (cand) { /* addSpark disabled */ addSpark(n, cand); n.lastSpark = ts; }
      }
    }

    // sparks disabled
requestAnimationFrame(step);
  }

  addEventListener("resize", initNodes, { passive: true });
  initNodes();
    // ---- Soft cutout under hero (erase dots inside the card) ----
  const bubble = getBubbleRect(20); // padding around the card
  if (bubble) {
    ctx.save();
    ctx.globalCompositeOperation = "destination-out";
    ctx.shadowColor = "rgba(0,0,0,1)";
    ctx.shadowBlur = 28; // feather strength
    roundRectPath(ctx, bubble.x, bubble.y, bubble.w, bubble.h, bubble.radius);
    ctx.fillStyle = "rgba(0,0,0,1)";
    ctx.fill();
    ctx.restore();
  }

  requestAnimationFrame(step);
}
)();
