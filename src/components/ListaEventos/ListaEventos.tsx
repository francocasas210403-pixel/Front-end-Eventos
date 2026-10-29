import { useState, useEffect } from "react";
import { Card, Row, Col, Badge, Button, Form, InputGroup } from "react-bootstrap";
import {
  obtenerEventos,
  crearEvento,
  editarEvento,
  eliminarEvento,
  registrarParticipante,
  obtenerEventosPorFecha,
} from "../../services/eventoServicios";
import type { Evento, EventoFormulario } from "../../types/Evento";
import ModalEvento from "../ModalEvento/ModalEvento";
import ModalRegistrar from "../ModalRegistrar/ModalRegistrar";

const ListaEventos = () => {
  const [datos, setDatos] = useState<Evento[]>([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Estados para modales
  const [mostrarModalEvento, setMostrarModalEvento] = useState(false);
  const [eventoAEditar, setEventoAEditar] = useState<Evento | null>(null);

  const [mostrarModalRegistro, setMostrarModalRegistro] = useState(false);
  const [eventoARegistrar, setEventoARegistrar] = useState<Evento | null>(null);

  // Estados para buscador y filtros
  const [busquedaTexto, setBusquedaTexto] = useState("");
  const [busquedaFecha, setBusquedaFecha] = useState("");

  const cargarEventos = async () => {
    try {
      setCargando(true);
      const res = await obtenerEventos();
      setDatos(res);
      setError(null);
    } catch {
      setError("No se pudieron cargar los eventos");
    } finally {
      setCargando(false);
    }
  };

  useEffect(() => {
    cargarEventos();
  }, []);

  // Manejador del buscador por fecha
  const buscarPorFecha = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const fecha = e.target.value;
    setBusquedaFecha(fecha);
    if (!fecha) {
      cargarEventos();
      return;
    }
    try {
      setCargando(true);
      const res = await obtenerEventosPorFecha(fecha);
      setDatos(res);
    } catch {
      setError("Error al buscar por fecha");
    } finally {
      setCargando(false);
    }
  };

  // Guardar (Crear o Editar)
  const handleGuardarEvento = async (datosForm: EventoFormulario) => {
    if (eventoAEditar) {
      const actualizado = await editarEvento(eventoAEditar._id, datosForm);
      setDatos(datos.map((ev) => (ev._id === actualizado._id ? actualizado : ev)));
    } else {
      const nuevo = await crearEvento(datosForm);
      setDatos([...datos, nuevo]);
    }
    setMostrarModalEvento(false);
    setEventoAEditar(null);
  };

  // Eliminar
  const handleEliminar = async (id: string) => {
    if (window.confirm("¿Estás seguro de que deseas eliminar este evento?")) {
      try {
        await eliminarEvento(id);
        setDatos(datos.filter((ev) => ev._id !== id));
      } catch {
        alert("Error al eliminar el evento");
      }
    }
  };

  // Registrar participante
  const handleRegistrar = async (valores: { nombre: string; email: string }) => {
    if (!eventoARegistrar) return;
    const actualizado = await registrarParticipante(eventoARegistrar._id, valores);
    setDatos(datos.map((ev) => (ev._id === actualizado._id ? actualizado : ev)));
    setMostrarModalRegistro(false);
    setEventoARegistrar(null);
    alert("¡Registro exitoso!");
  };

  // Filtrar eventos en memoria de forma segura (evita errores si falta algún campo)
  const eventosFiltrados = Array.isArray(datos)
    ? datos.filter((ev) => {
        const nombre = ev.nombre ? ev.nombre.toLowerCase() : "";
        const lugar = ev.lugar ? ev.lugar.toLowerCase() : "";
        const texto = busquedaTexto.toLowerCase();
        return nombre.includes(texto) || lugar.includes(texto);
      })
    : [];

  return (
    <div 
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #0b0f19 0%, #111827 50%, #030712 100%)",
        padding: "3rem 2rem",
      }}
    >
      <div className="container" style={{ maxWidth: "1200px" }}>
        <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-3">
          {/* Título principal con tipografía Playfair Display */}
          <h2 
            className="mb-0 text-white fw-bold display-6" 
            style={{ 
              fontFamily: "'Playfair Display', serif",
              letterSpacing: "-0.5px" 
            }}
          >
            Eventos Disponibles
          </h2>
          <Button
            variant="light"
            className="fw-semibold text-dark shadow-sm px-4 py-2"
            onClick={() => {
              setEventoAEditar(null);
              setMostrarModalEvento(true);
            }}
          >
            + Agregar evento
          </Button>
        </div>

        {/* Barra de Búsqueda y Filtros */}
        <Row className="mb-5 g-3">
          <Col md={6}>
            <InputGroup>
              <Form.Control
                type="text"
                placeholder="Buscar por nombre o lugar..."
                value={busquedaTexto}
                onChange={(e) => setBusquedaTexto(e.target.value)}
                className="py-2 bg-white bg-opacity-10 text-white border-0 shadow-sm"
                style={{ backdropFilter: "blur(10px)" }}
              />
            </InputGroup>
          </Col>
          <Col md={6}>
            <Form.Control
              type="date"
              value={busquedaFecha}
              onChange={buscarPorFecha}
              className="py-2 bg-white bg-opacity-10 text-white border-0 shadow-sm"
              style={{ backdropFilter: "blur(10px)", colorScheme: "dark" }}
            />
          </Col>
        </Row>

        {/* Modales */}
        <ModalEvento
          mostrar={mostrarModalEvento}
          evento={eventoAEditar}
          onCerrar={() => {
            setMostrarModalEvento(false);
            setEventoAEditar(null);
          }}
          onGuardar={handleGuardarEvento}
        />

        {eventoARegistrar && (
          <ModalRegistrar
            mostrar={mostrarModalRegistro}
            nombreEvento={eventoARegistrar.nombre}
            onCerrar={() => {
              setMostrarModalRegistro(false);
              setEventoARegistrar(null);
            }}
            onRegistrar={handleRegistrar}
          />
        )}

        {cargando && <p className="text-center text-white py-5">Cargando eventos...</p>}
        {error && <p className="text-danger text-center py-3">{error}</p>}

        {!cargando && !error && (
          <Row>
            {eventosFiltrados.length === 0 ? (
              <Col className="text-center py-5">
                <p className="text-white-50 fs-5">No se encontraron eventos disponibles.</p>
              </Col>
            ) : (
              eventosFiltrados.map((evento) => (
                <Col md={4} key={evento._id} className="mb-4">
                  <Card className="h-100 shadow border-0 position-relative p-2 bg-white rounded-3">
                    <Card.Body className="d-flex flex-column justify-content-between">
                      <div>
                        {/* Fila superior: Título y Botón Registrar */}
                        <div className="d-flex justify-content-between align-items-start mb-2">
                          <div>
                            <Card.Title className="fw-bold mb-1 text-dark fs-5">
                              {evento.nombre}
                            </Card.Title>
                            <Card.Subtitle className="text-secondary small">
                              {new Date(evento.fecha).toLocaleDateString()} · {evento.lugar}
                            </Card.Subtitle>
                          </div>
                          <Button
                            variant="outline-success"
                            size="sm"
                            onClick={() => {
                              setEventoARegistrar(evento);
                              setMostrarModalRegistro(true);
                            }}
                          >
                            Registrarse
                          </Button>
                        </div>

                        <Card.Text className="text-muted small mt-3">
                          {evento.descripcion}
                        </Card.Text>
                      </div>

                      {/* Fila inferior: Badge de entradas y botones Editar / Eliminar */}
                      <div className="d-flex justify-content-between align-items-center mt-4 pt-2 border-top">
                        <Badge bg="dark" className="text-white px-2 py-2">
                          Entradas: {evento.entradasDisponibles}
                        </Badge>
                        <div className="d-flex gap-1">
                          <Button
                            variant="outline-primary"
                            size="sm"
                            onClick={() => {
                              setEventoAEditar(evento);
                              setMostrarModalEvento(true);
                            }}
                          >
                            Editar
                          </Button>
                          <Button
                            variant="outline-danger"
                            size="sm"
                            onClick={() => handleEliminar(evento._id)}
                          >
                            Eliminar
                          </Button>
                        </div>
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
              ))
            )}
          </Row>
        )}
      </div>
    </div>
  );
};

export default ListaEventos;