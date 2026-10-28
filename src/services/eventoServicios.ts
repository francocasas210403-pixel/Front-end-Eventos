import axios from "axios";
import type { Evento, EventoFormulario } from "../types/Evento";

const BASE_URL = "http://localhost:3000/eventos";

// Obtener eventos con entradas disponibles
export const obtenerEventos = async (): Promise<Evento[]> => {
  const respuesta = await axios.get(`${BASE_URL}/disponibles`);
  return respuesta.data;
};

// Crear un nuevo evento
export const crearEvento = async (datos: EventoFormulario): Promise<Evento> => {
  const respuesta = await axios.post(BASE_URL, datos);
  return respuesta.data.evento;
};