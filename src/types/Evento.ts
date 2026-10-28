export type Evento = {
  _id: string;
  nombre: string;
  descripcion: string;
  fecha: string;
  lugar: string;
  capacidadMaxima: number;
  entradasDisponibles: number;
};

export type EventoFormulario = Pick<
  Evento,
  "nombre" | "descripcion" | "fecha" | "lugar" | "capacidadMaxima" | "entradasDisponibles"
>;