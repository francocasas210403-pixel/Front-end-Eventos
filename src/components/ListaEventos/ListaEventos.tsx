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
    <>
      <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-3">
        <h2 className="mb-0">Eventos Disponibles</h2>
        <Button
          variant="primary"
          onClick={() => {
            setEventoAEditar(null);
            setMostrarModalEvento(true);
          }}
        >
          + Agregar evento
        </Button>
      </div>

      {/* Barra de Búsqueda y Filtros */}
      <Row className="mb-4 g-3">
        <Col md={6}>
          <InputGroup>
            <Form.Control
              type="text"
              placeholder="Buscar por nombre o lugar..."
              value={busquedaTexto}
              onChange={(e) => setBusquedaTexto(e.target.value)}
            />
          </InputGroup>
        </Col>
        <Col md={6}>
          <Form.Control
            type="date"
            value={busquedaFecha}
            onChange={buscarPorFecha}
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

      {cargando && <p className="text-center">Cargando...</p>}
      {error && <p className="text-danger">{error}</p>}

      {!cargando && !error && (
        <Row>
          {eventosFiltrados.length === 0 ? (
            <p className="text-muted">No se encontraron eventos.</p>
          ) : (
            eventosFiltrados.map((evento) => (
              <Col md={4} key={evento._id} className="mb-4">
                <Card className="h-100 shadow-sm border-0 position-relative p-2">
                  <Card.Body className="d-flex flex-column justify-content-between">
                    <div>
                      {/* Fila superior: Título y Botón Registrar en el rectángulo superior derecho */}
                      <div className="d-flex justify-content-between align-items-start mb-2">
                        <div>
                          <Card.Title className="fw-bold mb-1">{evento.nombre}</Card.Title>
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

                      <Card.Text className="text-muted small mt-2">
                        {evento.descripcion}
                      </Card.Text>
                    </div>

                    {/* Fila inferior: Badge de entradas y botones Editar / Eliminar */}
                    <div className="d-flex justify-content-between align-items-center mt-3 pt-2 border-top">
                      <Badge bg="info" className="text-dark">
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
    </>
  );
};

export default ListaEventos;