import { useState, useEffect } from "react";
import { Card, Row, Col } from "react-bootstrap";
import { obtenerEventos } from "../../services/eventoServicios";
import type { Evento } from "../../types/Evento";

const ListaEventos = () => {
  const [datos, setDatos] = useState<Evento[]>([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    obtenerEventos()
      .then(setDatos)
      .catch(() => setError("No se pudieron cargar los eventos"))
      .finally(() => setCargando(false));
  }, []);

  return (
    <>
      <h2 className="mb-3">Eventos</h2>
      {cargando && <p>Cargando...</p>}
      {error && <p>{error}</p>}
      {!cargando && !error && (
        <Row>
          {datos.map((evento) => (
            <Col md={4} key={evento._id}>
              <Card className="mb-3">
                <Card.Body>
                  <Card.Title>{evento.titulo}</Card.Title>
                  <Card.Subtitle className="text-secondary mb-2">
                    {evento.fecha} · {evento.categoria}
                  </Card.Subtitle>
                  <Card.Text>{evento.descripcion}</Card.Text>
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