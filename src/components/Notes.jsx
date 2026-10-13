import Diagram from './Diagram.jsx';
import { DIAGRAM_BASICO, DIAGRAM_INCLUDE, DIAGRAM_EXTEND, DIAGRAM_GEN, DIAGRAM_GEN_UC } from '../data/diagrams.js';

function Card({ title, children, wide }) {
  return (
    <section className={`note-card ${wide ? 'wide' : ''}`}>
      <h2>{title}</h2>
      {children}
    </section>
  );
}

export default function Notes({ onBack }) {
  return (
    <div className="page">
      <div className="page-head">
        <button className="btn btn-ghost" onClick={onBack}>← Mapa</button>
        <h1>📘 Apuntes</h1>
        <span className="pill">Chuleta de casos de uso</span>
      </div>

      <div className="notes-grid">
        <Card title="🎯 Caso de uso" wide>
          <p>
            Describe <b>qué hace el sistema</b> para que un <b>actor</b> logre un <b>objetivo de valor</b>. Captura requisitos
            funcionales desde el punto de vista del usuario. Se nombra con <b>verbo en infinitivo + complemento</b>:
            «Retirar efectivo», «Reservar sala».
          </p>
          <Diagram spec={DIAGRAM_BASICO} className="small" />
        </Card>

        <Card title="🎭 Actor">
          <ul>
            <li>Es un <b>rol</b> externo al sistema, no una persona concreta.</li>
            <li>Puede ser una persona, otro sistema, un dispositivo o el tiempo.</li>
            <li><b>Primario</b>: inicia el caso para lograr su objetivo.</li>
            <li><b>Secundario</b>: presta un servicio que el sistema necesita.</li>
            <li>Siempre <b>fuera</b> del límite del sistema.</li>
          </ul>
        </Card>

        <Card title="🔍 Cómo encontrar casos de uso">
          <ul>
            <li>Pregunta a cada actor: <i>¿qué quieres lograr?</i></li>
            <li><b>Prueba del jefe</b> (Larman): ¿tu jefe estaría contento si dices que hiciste eso todo el día?</li>
            <li>Descarta pasos de interfaz («Hacer clic…»), tareas internas («Guardar en BD») y cosas («Pantalla…»).</li>
          </ul>
        </Card>

        <Card title="🔒 «include»">
          <p>
            El caso base <b>siempre</b> ejecuta el incluido. Sirve para factorizar comportamiento común. Flecha discontinua
            <b> del base al incluido</b>.
          </p>
          <Diagram spec={DIAGRAM_INCLUDE} className="small" />
        </Card>

        <Card title="🎲 «extend»">
          <p>
            Comportamiento <b>opcional o condicional</b> que se añade al caso base en un punto de extensión. Flecha discontinua
            <b> del que extiende al base</b>. El base está completo sin él.
          </p>
          <Diagram spec={DIAGRAM_EXTEND} className="small" />
        </Card>

        <Card title="🧬 Generalización entre actores">
          <p>Línea continua con <b>triángulo hueco hacia el padre</b>. El hijo hereda las asociaciones del padre.</p>
          <Diagram spec={DIAGRAM_GEN} className="small" />
        </Card>

        <Card title="🧬 Generalización entre casos de uso">
          <p>El caso hijo es una forma concreta del caso padre.</p>
          <Diagram spec={DIAGRAM_GEN_UC} className="small" />
        </Card>

        <Card title="📝 Plantilla de especificación" wide>
          <table className="spec-table">
            <tbody>
              <tr><th>Nombre</th><td>Retirar efectivo</td></tr>
              <tr><th>Actor primario</th><td>Cliente</td></tr>
              <tr><th>Actores secundarios</th><td>Sistema bancario</td></tr>
              <tr><th>Precondiciones</th><td>El cajero está operativo y conectado al sistema bancario.</td></tr>
              <tr>
                <th>Flujo principal</th>
                <td>
                  1. El cliente introduce la tarjeta.<br />
                  2. El sistema solicita el PIN.<br />
                  3. El cliente introduce el PIN.<br />
                  4. El sistema valida el PIN con el sistema bancario.<br />
                  5. El cliente indica la cantidad.<br />
                  6. El sistema devuelve la tarjeta y entrega el efectivo.
                </td>
              </tr>
              <tr>
                <th>Flujos alternativos</th>
                <td>
                  4a. PIN incorrecto: el sistema muestra un aviso y vuelve al paso 2.<br />
                  5a. Saldo insuficiente: el sistema informa y vuelve al paso 5.
                </td>
              </tr>
              <tr><th>Postcondiciones</th><td>El importe se ha descontado de la cuenta y el efectivo se ha entregado.</td></tr>
            </tbody>
          </table>
          <p className="muted">Un <b>escenario</b> es un camino concreto a través del caso de uso.</p>
        </Card>

        <Card title="🚫 Errores típicos" wide>
          <div className="two-col">
            <ul>
              <li>Actores dentro del límite del sistema.</li>
              <li>Personas concretas («Juan») como actores.</li>
              <li>Componentes internos (la BD) como actores.</li>
              <li>Asociaciones entre actores.</li>
            </ul>
            <ul>
              <li>Casos de uso con nombre de clic o de pantalla.</li>
              <li>Flechas «include»/«extend» en sentido contrario.</li>
              <li>Líneas simples entre casos de uso.</li>
              <li>Usar «include» para descomponer en pasos (diagrama de flujo).</li>
            </ul>
          </div>
        </Card>
      </div>
    </div>
  );
}
