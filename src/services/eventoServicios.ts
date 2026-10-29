import axios from "axios";
import type { Evento, EventoFormulario } from "../types/Evento";

const BASE_URL = "http://localhost:3000/eventos";

// Obtener eventos disponibles
export const obtenerEventos = async (): Promise<Evento[]> => {
  const respuesta = await axios.get(`${BASE_URL}/disponibles`);
  return respuesta.data;
};

// Buscar eventos por fecha (YYYY-MM-DD)
export const obtenerEventosPorFecha = async (fecha: string): Promise<Evento[]> => {
  const respuesta = await axios.get(`${BASE_URL}/fecha/${fecha}`);
  return respuesta.data;
};

// Crear evento
export const crearEvento = async (datos: EventoFormulario): Promise<Evento> => {
  const respuesta = await axios.post(BASE_URL, datos);
  return respuesta.data.evento;
};

// Editar evento (PUT)
export const editarEvento = async (id: string, datos: EventoFormulario): Promise<Evento> => {
  const respuesta = await axios.put(`${BASE_URL}/${id}`, datos);
  return respuesta.data.evento;
};

// Eliminar evento (DELETE)
export const eliminarEvento = async (id: string): Promise<void> => {
  await axios.delete(`${BASE_URL}/${id}`);
};

// Endpoint de negocio: Registrar participante
export const registrarParticipante = async (
  idEvento: string,
  participante: { nombre: string; email: string }
): Promise<Evento> => {
  const respuesta = await axios.post(`${BASE_URL}/${idEvento}/registrar`, participante);
  return respuesta.data.evento;
};