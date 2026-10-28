import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import BotonColor from "../components/BotonColor/BotonColor";

const PaginaInicio = () => {
  return (
    <section className="py-5 bg-light">
      <Container className="py-5">
        <Row className="align-items-center g-4">
          <Col md={6}>
            <h1 className="display-5 fw-bold">Pilar Tecno</h1>
            <p className="lead text-secondary">
              Bienvenido a la plataforma de gestión de eventos de Pilar Tecno.
            </p>
            <div className="d-flex gap-2">
              <Link to="/eventos" className="btn btn-primary">
                Ver eventos
              </Link>
              <BotonColor />
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default PaginaInicio;