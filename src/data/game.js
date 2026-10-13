import { LEVELS } from './levels.js';

export const MAX_HEARTS = 3;
export const STAR_BONUS = 50;
export const STREAK_STEP = 10;
export const STREAK_CAP = 5;

export const RANKS = [
  { min: 0, name: 'Becario/a', icon: '🐣' },
  { min: 800, name: 'Analista Junior', icon: '🌱' },
  { min: 2000, name: 'Analista', icon: '🧠' },
  { min: 3500, name: 'Analista Senior', icon: '🚀' },
  { min: 5000, name: 'Arquitecto/a de Requisitos', icon: '🏛️' },
  { min: 6500, name: 'Leyenda UML', icon: '👑' },
];

export function rankFor(xp) {
  let i = 0;
  while (i + 1 < RANKS.length && xp >= RANKS[i + 1].min) i++;
  const current = RANKS[i];
  const next = RANKS[i + 1] || null;
  const progress = next ? (xp - current.min) / (next.min - current.min) : 1;
  return { current, next, progress };
}

export function totalXp(p) {
  return Object.values(p.levels).reduce((s, l) => s + (l.bestXp || 0), 0);
}

export function totalStars(p) {
  return Object.values(p.levels).reduce((s, l) => s + (l.stars || 0), 0);
}

export function completedCount(p) {
  return Object.values(p.levels).filter((l) => l.completed).length;
}

export const MAX_STARS = LEVELS.length * 3;

const starsIn = (p, id) => p.levels[id]?.stars || 0;

export const BADGES = [
  { id: 'primer-paso', icon: '🚀', name: 'Primer paso', desc: 'Completa tu primer nivel.', test: (p) => completedCount(p) >= 1 },
  { id: 'en-racha', icon: '🔥', name: 'En racha', desc: 'Consigue 5 aciertos seguidos.', test: (p) => p.bestStreak >= 5 },
  { id: 'imparable', icon: '⚡', name: 'Imparable', desc: 'Consigue 12 aciertos seguidos.', test: (p) => p.bestStreak >= 12 },
  { id: 'perfeccionista', icon: '💎', name: 'Perfeccionista', desc: 'Consigue 3 estrellas en un nivel.', test: (p) => Object.values(p.levels).some((l) => l.stars === 3) },
  { id: 'media-mision', icon: '🧭', name: 'Media misión', desc: 'Completa 4 niveles.', test: (p) => completedCount(p) >= 4 },
  { id: 'arquitecto', icon: '🧩', name: 'Arquitecto/a', desc: 'Consigue 3 estrellas en «Arquitecto de diagramas».', test: (p) => starsIn(p, 'constructor') === 3 },
  { id: 'sherlock', icon: '🕵️', name: 'Sherlock', desc: 'Consigue 3 estrellas en «Detective de errores».', test: (p) => starsIn(p, 'detective') === 3 },
  { id: 'pluma', icon: '🖋️', name: 'Pluma de oro', desc: 'Consigue 3 estrellas en «Especificación textual».', test: (p) => starsIn(p, 'especificacion') === 3 },
  { id: 'cazajefes', icon: '👾', name: 'Cazador/a de jefes', desc: 'Derrota al jefe final.', test: (p) => !!p.levels.jefe?.completed },
  { id: 'coleccionista', icon: '🌟', name: 'Coleccionista', desc: `Consigue las ${MAX_STARS} estrellas.`, test: (p) => totalStars(p) >= MAX_STARS },
  { id: 'leyenda', icon: '👑', name: 'Leyenda UML', desc: 'Alcanza el rango máximo.', test: (p) => totalXp(p) >= RANKS[RANKS.length - 1].min },
];

export function earnedBadges(p) {
  return BADGES.filter((b) => b.test(p)).map((b) => b.id);
}

export function isUnlocked(p, index) {
  return index === 0 || !!p.levels[LEVELS[index - 1].id]?.completed;
}
