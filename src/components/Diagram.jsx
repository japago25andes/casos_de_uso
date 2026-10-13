import { useId } from 'react';

const UC_RX = 80;
const UC_RY = 32;

function wrap(text, max) {
  const lines = [];
  let cur = '';
  for (const word of text.split(' ')) {
    const next = cur ? `${cur} ${word}` : word;
    if (next.length > max && cur) {
      lines.push(cur);
      cur = word;
    } else cur = next;
  }
  if (cur) lines.push(cur);
  return lines;
}

// Zona que ocupa cada elemento, aproximada como elipse, para recortar las líneas en su borde.
function geom(el) {
  return el.kind === 'actor'
    ? { cx: el.x, cy: el.y + 5, rx: 30, ry: 48 }
    : { cx: el.x, cy: el.y, rx: el.rx || UC_RX, ry: el.ry || UC_RY };
}

function clip(g, tx, ty) {
  const dx = tx - g.cx;
  const dy = ty - g.cy;
  const t = 1 / Math.sqrt((dx / g.rx) ** 2 + (dy / g.ry) ** 2);
  return [g.cx + dx * t, g.cy + dy * t];
}

/** Posición en % de un punto del viewBox, para superponer elementos HTML. */
export function pct(spec, x, y) {
  return { left: `${(x / spec.w) * 100}%`, top: `${(y / spec.h) * 100}%` };
}

/** Tamaño en % de la zona clicable de un elemento. */
export function zoneSize(spec, el) {
  const isActor = el.kind === 'actor';
  const w = isActor ? 96 : (el.rx || UC_RX) * 2;
  const h = isActor ? 104 : (el.ry || UC_RY) * 2;
  const cy = isActor ? el.y + 5 : el.y;
  return { ...pct(spec, el.x, cy), width: `${(w / spec.w) * 100}%`, height: `${(h / spec.h) * 100}%` };
}

export function elementsOf(spec) {
  return [
    ...(spec.actors || []).map((a) => ({ ...a, kind: 'actor' })),
    ...(spec.useCases || []).map((u) => ({ ...u, kind: 'usecase' })),
  ];
}

function Actor({ el }) {
  const { x, y } = el;
  const lines = el.label ? wrap(el.label, 14) : [];
  return (
    <g className={`d-actor ${el.status || ''}`}>
      <circle cx={x} cy={y - 30} r={10} />
      <line x1={x} y1={y - 20} x2={x} y2={y + 8} />
      <line x1={x - 17} y1={y - 10} x2={x + 17} y2={y - 10} />
      <line x1={x} y1={y + 8} x2={x - 13} y2={y + 28} />
      <line x1={x} y1={y + 8} x2={x + 13} y2={y + 28} />
      {lines.map((l, i) => (
        <text key={i} x={x} y={y + 46 + i * 15} className="d-label" textAnchor="middle">
          {l}
        </text>
      ))}
    </g>
  );
}

function UseCase({ el }) {
  const rx = el.rx || UC_RX;
  const ry = el.ry || UC_RY;
  const lines = el.label ? wrap(el.label, Math.floor((rx * 2) / 9)) : [];
  return (
    <g className={`d-uc ${el.status || ''}`}>
      <ellipse cx={el.x} cy={el.y} rx={rx} ry={ry} />
      {lines.map((l, i) => (
        <text
          key={i}
          x={el.x}
          y={el.y + 4.5 + (i - (lines.length - 1) / 2) * 15}
          className="d-label"
          textAnchor="middle"
        >
          {l}
        </text>
      ))}
    </g>
  );
}

export default function Diagram({ spec, children, className = '' }) {
  const uid = useId().replace(/:/g, '');
  const els = elementsOf(spec);
  const byId = Object.fromEntries(els.map((e) => [e.id, e]));
  const b = spec.boundary;

  return (
    <div className={`diagram ${className}`}>
      <svg viewBox={`0 0 ${spec.w} ${spec.h}`} role="img" aria-label="Diagrama de casos de uso">
        <defs>
          <marker id={`arrow-${uid}`} viewBox="0 0 14 14" refX="13" refY="7" markerWidth="14" markerHeight="14" orient="auto" markerUnits="userSpaceOnUse">
            <path d="M1 1 L13 7 L1 13" className="d-arrowhead" />
          </marker>
          <marker id={`tri-${uid}`} viewBox="0 0 18 18" refX="17" refY="9" markerWidth="18" markerHeight="18" orient="auto" markerUnits="userSpaceOnUse">
            <path d="M1 1 L17 9 L1 17 Z" className="d-triangle" />
          </marker>
        </defs>

        {b && (
          <g className="d-boundary">
            <rect x={b.x} y={b.y} width={b.w} height={b.h} rx={14} />
            <text x={b.x + 16} y={b.y + 26}>{b.title}</text>
          </g>
        )}

        {spec.links.map((l, i) => {
          const from = byId[l.from];
          const to = byId[l.to];
          if (!from || !to) return null;
          const ga = geom(from);
          const gb = geom(to);
          const [x1, y1] = clip(ga, gb.cx, gb.cy);
          const [x2, y2] = clip(gb, ga.cx, ga.cy);
          const dashed = l.type === 'include' || l.type === 'extend';
          const marker = dashed ? `url(#arrow-${uid})` : l.type === 'gen' ? `url(#tri-${uid})` : undefined;
          return (
            <g key={i} className={`d-link ${l.type}`}>
              <line x1={x1} y1={y1} x2={x2} y2={y2} strokeDasharray={dashed ? '7 6' : undefined} markerEnd={marker} />
              {dashed && (
                <text x={(x1 + x2) / 2} y={(y1 + y2) / 2 - 8} textAnchor="middle" className="d-stereo">
                  «{l.type}»
                </text>
              )}
            </g>
          );
        })}

        {els.map((el) => (el.kind === 'actor' ? <Actor key={el.id} el={el} /> : <UseCase key={el.id} el={el} />))}
      </svg>
      {children && <div className="diagram-overlay">{children}</div>}
    </div>
  );
}
