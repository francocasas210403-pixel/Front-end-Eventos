import { Container, Row, Col } from "react-bootstrap";
import BarraNavegacion from "./components/BarraNavegacion/BarraNavegacion";
import BotonColor from "./components/BotonColor/BotonColor";
import ListaEventos from "./components/ListaEventos/ListaEventos";

function App() {
  return (
    <>
      <BarraNavegacion />
      <Container className="mt-4">
        <Row>
          <Col md={6}>
            <h1>Pilar tecno</h1>
            <p>Bienvenido al curso de React</p>
            <BotonColor />
          </Col>
          <Col md={6}>
            <ListaEventos />
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default App;