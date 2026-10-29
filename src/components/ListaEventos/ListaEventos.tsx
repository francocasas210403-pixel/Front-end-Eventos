import { useState, useEffect } from "react";
import { Card, Row, Col, Badge, Button } from "react-bootstrap";
import { obtenerEventos, crearEvento } from "../../services/eventoServicios";
import type { Evento, EventoFormulario } from "../../types/Evento";
import ModalEvento from "../ModalEvento/ModalEvento";


const ListaEventos = () => {
  const [datos, setDatos] = useState<Evento[]>([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [mostrarModal, setMostrarModal] = useState(false);

  useEffect(() => {
    obtenerEventos()
      .then(setDatos)
      .catch(() => setError("No se pudieron cargar los eventos"))
      .finally(() => setCargando(false));
  }, []);

  const agregarEvento = async (datosForm: EventoFormulario) => {
    const nuevo = await crearEvento(datosForm);
    setDatos((anteriores) => [...anteriores, nuevo]);
    setMostrarModal(false);
  };

  return (
    <>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2 className="mb-0">Eventos Disponibles</h2>
        <Button onClick={() => setMostrarModal(true)}>Agregar evento</Button>
      </div>

      <ModalEvento
        mostrar={mostrarModal}
        onCerrar={() => setMostrarModal(false)}
        onGuardar={agregarEvento}
      />

      {cargando && <p>Cargando...</p>}
      {error && <p>{error}</p>}
      {!cargando && !error && (
        <Row>
          {datos.map((evento) => (
            <Col md={4} key={evento._id}>
              <Card className="mb-3 shadow-sm">
                <Card.Body>
                  <Card.Title>{evento.nombre}</Card.Title>
                  <Card.Subtitle className="text-secondary mb-2">
                    {new Date(evento.fecha).toLocaleDateString()} · {evento.lugar}
                  </Card.Subtitle>
                  <Card.Text>{evento.descripcion}</Card.Text>
                  <Badge bg="info">Entradas: {evento.entradasDisponibles}</Badge>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </>
  );
};

export default ListaEventos;