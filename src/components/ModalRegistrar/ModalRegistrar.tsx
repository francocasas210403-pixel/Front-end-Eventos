import { Modal, Button, Form } from "react-bootstrap";
import { useFormik } from "formik";
import * as Yup from "yup";

type Props = {
  mostrar: boolean;
  nombreEvento: string;
  onCerrar: () => void;
  onRegistrar: (datos: { nombre: string; email: string }) => Promise<void>;
};

const esquemaRegistro = Yup.object({
  nombre: Yup.string().trim().required("El nombre del participante es obligatorio"),
  email: Yup.string().email("Email inválido").required("El email es obligatorio"),
});

const ModalRegistrar = ({ mostrar, nombreEvento, onCerrar, onRegistrar }: Props) => {
  const formik = useFormik({
    initialValues: { nombre: "", email: "" },
    validationSchema: esquemaRegistro,
    onSubmit: async (valores, { resetForm, setStatus }) => {
      try {
        await onRegistrar(valores);
        resetForm();
        onCerrar();
      } catch (error: any) {
        setStatus(error.response?.data?.mensaje || "Error al registrar participante");
      }
    },
  });

  const cerrarModal = () => {
    formik.resetForm();
    onCerrar();
  };

  return (
    <Modal show={mostrar} onHide={cerrarModal} centered>
      <Form onSubmit={formik.handleSubmit} noValidate>
        <Modal.Header closeButton>
          <Modal.Title>Registrarse a: {nombreEvento}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group className="mb-3">
            <Form.Label>Nombre y Apellido</Form.Label>
            <Form.Control
              type="text"
              name="nombre"
              value={formik.values.nombre}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              isInvalid={formik.touched.nombre && !!formik.errors.nombre}
            />
            <Form.Control.Feedback type="invalid">
              {formik.errors.nombre}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Correo Electrónico</Form.Label>
            <Form.Control
              type="email"
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              isInvalid={formik.touched.email && !!formik.errors.email}
            />
            <Form.Control.Feedback type="invalid">
              {formik.errors.email}
            </Form.Control.Feedback>
          </Form.Group>

          {formik.status && <p className="text-danger mt-2">{formik.status}</p>}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={cerrarModal}>
            Cancelar
          </Button>
          <Button variant="success" type="submit" disabled={formik.isSubmitting}>
            Confirmar Registro
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default ModalRegistrar;