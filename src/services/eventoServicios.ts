import axios from "axios";
import type { Evento } from "../types/Evento";

const BASE_URL = "http://localhost:3000/api/eventos";

export const obtenerEventos = async (): Promise<Evento[] > => {
  const respuesta = await axios.get(BASE_URL);
  return respuesta.data;
};