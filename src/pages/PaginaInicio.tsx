import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";

const PaginaInicio = () => {
  return (
    <div 
      className="d-flex flex-column justify-content-center align-items-center text-center py-5" 
      style={{ minHeight: "80vh", backgroundColor: "#ffffff", color: "#000000" }}
    >
      <Container style={{ maxWidth: "850px" }}>
        
        {/* Título Principal más grande */}
        <h1 
          className="display-2 fw-bold mb-4" 
          style={{ 
            fontFamily: "'Playfair Display', serif", 
            letterSpacing: "-1.5px", 
            color: "#000000",
            fontSize: "4rem"
          }}
        >
          EVENTOS ONLINE
        </h1>

        {/* Descripción */}
        <p 
          className="lead mb-5 px-md-4" 
          style={{ 
            color: "#555555", 
            fontSize: "1.3rem", 
            lineHeight: "1.7" 
          }}
        >
          Una plataforma web moderna para descubrir, gestionar y registrarte en los mejores eventos tecnológicos y académicos de Pilar Tecno en un solo lugar.
        </p>

        {/* Botón Ver Eventos (Negro/Gris oscuro, con más margen top) */}
        <div className="mt-5">
          <Link 
            to="/eventos" 
            className="btn btn-lg px-5 py-3 fw-semibold shadow text-white"
            style={{ 
              backgroundColor: "#1a1a1a", 
              borderColor: "#1a1a1a",
              borderRadius: "8px",
              letterSpacing: "0.5px",
              transition: "all 0.3s ease"
            }}
          >
            Ver eventos
          </Link>
        </div>

      </Container>
    </div>
  );
};

export default PaginaInicio;