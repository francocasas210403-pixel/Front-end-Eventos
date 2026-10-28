import { Modal, Button, Form } from "react-bootstrap";
import { useFormik } from "formik";
import * as Yup from "yup";
import type { Evento, EventoFormulario } from "../../types/Evento";

type Props = {
  mostrar: boolean;
  evento?: Evento | null;
  onCerrar: () => void;
  onGuardar: (datos: EventoFormulario) => Promise<void>;
};

const esquema = Yup.object({
  nombre: Yup.string().trim().required("El nombre es obligatorio"),
  descripcion: Yup.string().trim().required("La descripción es obligatoria"),
  fecha: Yup.string().trim().required("La fecha es obligatoria"),
  lugar: Yup.string().trim().required("El lugar es obligatorio"),
  capacidadMaxima: Yup.number()
    .typeError("Debe ser un número")
    .positive("Debe ser mayor a 0")
    .required("La capacidad máxima es obligatoria"),
  entradasDisponibles: Yup.number()
    .typeError("Debe ser un número")
    .min(0, "No puede ser menor a 0")
    .required("Las entradas disponibles son obligatorias"),
});

const valoresIniciales: EventoFormulario = {
  nombre: "",
  descripcion: "",
  fecha: "",
  lugar: "",
  capacidadMaxima: 10,
  entradasDisponibles: 10,
};

const ModalEvento = ({ mostrar, evento, onCerrar, onGuardar }: Props) => {
  const formik = useFormik<EventoFormulario>({
    initialValues: evento
      ? {
          nombre: evento.nombre,
          descripcion: evento.descripcion,
          fecha: evento.fecha ? evento.fecha.split("T")[0] : "",
          lugar: evento.lugar,
          capacidadMaxima: evento.capacidadMaxima,
          entradasDisponibles: evento.entradasDisponibles,
        }
      : valoresIniciales,
    enableReinitialize: true,
    validationSchema: esquema,
    onSubmit: async (valores, { resetForm, setStatus }) => {
      try {
        await onGuardar(valores);
        resetForm();
      } catch {
        setStatus("No se pudo guardar el evento");
      }
    },
  });

  const cerrar = () => {
    formik.resetForm();
    onCerrar();
  };

  const campoTexto = (
    nombre: "nombre" | "descripcion" | "fecha" | "lugar" | "capacidadMaxima" | "entradasDisponibles",
    etiqueta: string,
    tipo: string = "text"
  ) => (
    <Form.Group className="mb-3" controlId={nombre}>
      <Form.Label>{etiqueta}</Form.Label>
      <Form.Control
        type={tipo}
        name={nombre}
        value={formik.values[nombre]}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        isInvalid={formik.touched[nombre] && !!formik.errors[nombre]}
      />
      <Form.Control.Feedback type="invalid">
        {formik.errors[nombre]}
      </Form.Control.Feedback>
    </Form.Group>
  );

  return (
    <Modal show={mostrar} onHide={cerrar} centered>
      <Form onSubmit={formik.handleSubmit} noValidate>
        <Modal.Header closeButton>
          <Modal.Title>{evento ? "Editar evento" : "Agregar evento"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {campoTexto("nombre", "Nombre del evento")}
          {campoTexto("descripcion", "Descripción")}
          {campoTexto("fecha", "Fecha", "date")}
          {campoTexto("lugar", "Lugar")}
          {campoTexto("capacidadMaxima", "Capacidad Máxima", "number")}
          {campoTexto("entradasDisponibles", "Entradas Disponibles", "number")}

          {formik.status && (
            <p className="text-danger mt-3 mb-0">{formik.status}</p>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={cerrar}>
            Cancelar
          </Button>
          <Button type="submit" disabled={formik.isSubmitting}>
            Guardar
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default ModalEvento;