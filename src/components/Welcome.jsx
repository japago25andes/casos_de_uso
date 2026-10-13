import { useState } from 'react';
import { Speech } from './Mascot.jsx';
import { sfx } from '../lib/sound.js';

export default function Welcome({ savedName, onStart, onContinue }) {
  const [name, setName] = useState('');

  function submit(e) {
    e.preventDefault();
    if (!name.trim()) return;
    sfx.win();
    onStart(name.trim());
  }

  return (
    <div className="welcome">
      <div className="welcome-hero">
        <div className="logo-badge">
          <span>UC</span>
        </div>
        <p className="eyebrow">Use Case Quest</p>
        <h1 className="title-xl">
          Misión: <span className="gradient-text">Casos de Uso</span>
        </h1>
        <p className="lead">Aprende a modelar requisitos como un/a profesional: actores, casos de uso, relaciones, diagramas y especificaciones… ¡jugando!</p>
      </div>

      <div className="welcome-card">
        <Speech mood="happy" size={120} title="Ana Lista · Analista senior en NubeLab">
          ¡Hola! Acabas de entrar como **becario/a** en **NubeLab**, una startup que hace software para todo tipo de clientes. Yo seré tu mentora. Supera los **8 niveles**, gana XP e insignias, ¡y conviértete en **Leyenda UML**!
        </Speech>

        {savedName ? (
          <div className="welcome-actions">
            <button className="btn btn-primary btn-lg glow" onClick={onContinue}>
              Continuar como {savedName} →
            </button>
          </div>
        ) : (
          <form className="welcome-form" onSubmit={submit}>
            <label htmlFor="player-name">¿Cómo te llamas?</label>
            <div className="input-row">
              <input
                id="player-name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Tu nombre"
                maxLength={40}
                autoFocus
                autoComplete="off"
              />
              <button className="btn btn-primary btn-lg glow" disabled={!name.trim()}>
                ¡Empezar misión! 🚀
              </button>
            </div>
          </form>
        )}

        <div className="feature-row">
          <div>🗺️<span>8 niveles</span></div>
          <div>🧩<span>6 tipos de reto</span></div>
          <div>🏅<span>11 insignias</span></div>
          <div>🎓<span>Certificado final</span></div>
        </div>
      </div>
    </div>
  );
}
