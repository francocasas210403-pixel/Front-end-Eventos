import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import imagenFondo from "../assets/fondo.jpg";

const PaginaInicio = () => {
  return (
    <div 
      className="d-flex flex-column justify-content-center align-items-center text-center py-5 position-relative" 
      style={{ 
        minHeight: "100vh", // Cubre el 100% del alto de la pantalla
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.65), rgba(0, 0, 0, 0.65)), url(${imagenFondo})`,
        backgroundSize: "cover",          // Se escala automáticamente sin cortarse
        backgroundPosition: "center",      // Centra la imagen siempre
        backgroundRepeat: "no-repeat",     // Evita que se repita en mosaico
        backgroundAttachment: "fixed",     // EFECTO INFINITO: El fondo queda fijo al hacer scroll
        color: "#ffffff"
      }}
    >
      <Container style={{ maxWidth: "850px" }} className="position-relative">
        
        {/* Título Principal */}
        <h1 
          className="display-2 fw-bold mb-4" 
          style={{ 
            fontFamily: "'Playfair Display', serif", 
            letterSpacing: "-1.5px", 
            color: "#ffffff",
            fontSize: "4rem"
          }}
        >
          EVENTOS ONLINE
        </h1>

        {/* Descripción */}
        <p 
          className="lead mb-5 px-md-4" 
          style={{ 
            color: "#e0e0e0", 
            fontSize: "1.3rem", 
            lineHeight: "1.7" 
          }}
        >
          Una plataforma web moderna para descubrir, gestionar y registrarte en los mejores eventos tecnológicos y académicos de Pilar Tecno en un solo lugar.
        </p>

        {/* Botón Ver Eventos */}
        <div className="mt-5">
          <Link 
            to="/eventos" 
            className="btn btn-lg px-5 py-3 fw-semibold shadow text-white"
            style={{ 
              backgroundColor: "#0d6efd", 
              borderColor: "#0d6efd",
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