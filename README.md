
Cómo correr el proyecto en local

Para ejecutar este frontend en tu entorno local, sigue estos pasos:

1. Clonar el repositorio

git clone https://github.com/francocasas210403-pixel/Front-end-Eventos.git
cd landing-pilar-tecno


2. Instalar dependencias

npm install


3. Iniciar el Backend (Requisito previo)

Asegúrate de tener corriendo tu API de Node.js/MongoDB en segundo plano (habitualmente en http://localhost:3000).

4. Ejecutar el servidor de desarrollo

npm run dev


5. Abrir la aplicación

Abre tu navegador e ingresa a la dirección que indique Vite (por defecto: http://localhost:5173).

----------------------------------------------------


API que Consume

El frontend está conectado a la API REST de gestión de eventos * **Repositorio del Backend (API):** [Tp-Api-Eventos](https://github.com/francocasas210403-pixel/Tp-Api-Eventos)

ABM Completo de Eventos:

Alta: Crear eventos mediante un formulario validado con Formik/Yup.

Lectura: Listar todos los eventos registrados con manejo de estados de carga y error.

Modificación: Editar datos de un evento existente.

Baja: Eliminar eventos con ventana de confirmación previa.

Endpoints de negocios de la API:

GET /eventos: Obtiene el listado completo de todos los eventos disponibles.

POST /eventos: Da de alta (crea) un nuevo evento.

PUT /eventos/:id (o PATCH): Modifica o edita un evento existente según su ID.

DELETE /eventos/:id: Elimina un evento del sistema por su ID.

GET /eventos/fecha/:fecha (o filtrado por parámetros): Busca y filtra los eventos que coincidan con una fecha específica.

POST /eventos/:id/registrar: Endpoint de negocio clave para registrar un participante (nombre y email) en un evento puntual.



----------------------------------------------------


Tecnologías Utilizadas

React + TypeScript

Vite (Herramienta de compilación y servidor de desarrollo)

React Router Dom (Navegación entre páginas sin recargar la pantalla)

Bootstrap & React-Bootstrap (Componentes de diseño y maquetado)

Axios (Gestión centralizada de peticiones HTTP desde services/)

Formik & Yup (Construcción y validación estricta de formularios)