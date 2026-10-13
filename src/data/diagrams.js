// Diagramas reutilizables (coordenadas en el sistema del viewBox w × h).
// actors: monigotes · useCases: óvalos · links: assoc | include | extend | gen

export const DIAGRAM_BASICO = {
  w: 600, h: 260,
  boundary: { x: 180, y: 15, w: 400, h: 230, title: 'Sistema de biblioteca' },
  actors: [{ id: 'est', x: 80, y: 120, label: 'Estudiante' }],
  useCases: [
    { id: 'buscar', x: 380, y: 85, label: 'Buscar libro' },
    { id: 'reservar', x: 380, y: 180, label: 'Reservar libro' },
  ],
  links: [
    { from: 'est', to: 'buscar', type: 'assoc' },
    { from: 'est', to: 'reservar', type: 'assoc' },
  ],
};

export const DIAGRAM_INCLUDE = {
  w: 620, h: 200,
  boundary: { x: 150, y: 15, w: 450, h: 170, title: 'Cajero automático' },
  actors: [{ id: 'cli', x: 70, y: 95, label: 'Cliente' }],
  useCases: [
    { id: 'retirar', x: 255, y: 100, label: 'Retirar efectivo' },
    { id: 'auth', x: 500, y: 100, label: 'Autenticar cliente' },
  ],
  links: [
    { from: 'cli', to: 'retirar', type: 'assoc' },
    { from: 'retirar', to: 'auth', type: 'include' },
  ],
};

export const DIAGRAM_EXTEND = {
  w: 620, h: 200,
  boundary: { x: 150, y: 15, w: 450, h: 170, title: 'Cajero automático' },
  actors: [{ id: 'cli', x: 70, y: 95, label: 'Cliente' }],
  useCases: [
    { id: 'retirar', x: 255, y: 100, label: 'Retirar efectivo' },
    { id: 'recibo', x: 500, y: 100, label: 'Imprimir recibo' },
  ],
  links: [
    { from: 'cli', to: 'retirar', type: 'assoc' },
    { from: 'recibo', to: 'retirar', type: 'extend' },
  ],
};

export const DIAGRAM_GEN = {
  w: 620, h: 270,
  boundary: { x: 190, y: 15, w: 410, h: 240, title: 'Tienda online' },
  actors: [
    { id: 'cli', x: 80, y: 60, label: 'Cliente' },
    { id: 'vip', x: 80, y: 200, label: 'Cliente VIP' },
  ],
  useCases: [
    { id: 'comprar', x: 395, y: 70, label: 'Comprar producto' },
    { id: 'ofertas', x: 395, y: 200, label: 'Acceder a ofertas VIP' },
  ],
  links: [
    { from: 'cli', to: 'comprar', type: 'assoc' },
    { from: 'vip', to: 'cli', type: 'gen' },
    { from: 'vip', to: 'ofertas', type: 'assoc' },
  ],
};

export const DIAGRAM_GEN_UC = {
  w: 620, h: 260,
  boundary: { x: 170, y: 15, w: 430, h: 230, title: 'Tienda online' },
  actors: [{ id: 'cli', x: 75, y: 75, label: 'Cliente' }],
  useCases: [
    { id: 'pagar', x: 300, y: 80, label: 'Pagar pedido' },
    { id: 'tarjeta', x: 300, y: 195, label: 'Pagar con tarjeta' },
    { id: 'paypal', x: 495, y: 195, label: 'Pagar con PayPal' },
  ],
  links: [
    { from: 'cli', to: 'pagar', type: 'assoc' },
    { from: 'tarjeta', to: 'pagar', type: 'gen' },
    { from: 'paypal', to: 'pagar', type: 'gen' },
  ],
};

export const DIAGRAM_ACTORES = {
  w: 620, h: 230,
  boundary: { x: 170, y: 15, w: 280, h: 200, title: 'App de delivery' },
  actors: [
    { id: 'cli', x: 75, y: 95, label: 'Cliente' },
    { id: 'pas', x: 545, y: 95, label: 'Pasarela de pago' },
  ],
  useCases: [{ id: 'pagar', x: 310, y: 110, label: 'Pagar pedido' }],
  links: [
    { from: 'cli', to: 'pagar', type: 'assoc' },
    { from: 'pas', to: 'pagar', type: 'assoc' },
  ],
};
