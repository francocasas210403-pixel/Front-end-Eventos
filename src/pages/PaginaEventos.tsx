import { Container } from "react-bootstrap";
import ListaEventos from "../components/ListaEventos/ListaEventos";

const PaginaEventos = () => {
  return (
    <Container className="py-4">
      <ListaEventos />
    </Container>
  );
};

export default PaginaEventos;