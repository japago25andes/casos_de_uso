import confetti from 'canvas-confetti';

export function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// Convierte **texto** en <strong>texto</strong>.
export function rich(text) {
  if (!text) return null;
  return text.split(/(\*\*[^*]+\*\*)/g).map((part, i) =>
    part.startsWith('**') && part.endsWith('**') ? <strong key={i}>{part.slice(2, -2)}</strong> : part,
  );
}

const COLORS = ['#8b5cf6', '#22d3ee', '#f472b6', '#facc15', '#4ade80'];

export function celebrate() {
  const end = Date.now() + 900;
  (function frame() {
    confetti({ particleCount: 6, angle: 60, spread: 70, origin: { x: 0, y: 0.7 }, colors: COLORS });
    confetti({ particleCount: 6, angle: 120, spread: 70, origin: { x: 1, y: 0.7 }, colors: COLORS });
    if (Date.now() < end) requestAnimationFrame(frame);
  })();
}

export function sparkle() {
  confetti({ particleCount: 40, spread: 60, startVelocity: 30, origin: { y: 0.75 }, colors: COLORS, scalar: 0.8 });
}
