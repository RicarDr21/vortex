# Vortex

Tienda de ropa en línea — proyecto de aula (reemplaza el Examen Final).

Backend y frontend viven en este mismo repositorio pero son dos proyectos independientes: cada uno tiene su propio `package.json` y se corre por separado. La única comunicación entre ellos es por la API REST (HTTP/JSON), el backend nunca renderiza vistas.

## Integrantes

- Santiago Antolinez 
- Caren Diaz
- David Hernández 

## Estructura

```
vortex/
  backend/    -> API REST (Node.js + Express + MongoDB Atlas)
  frontend/   -> catálogo, carrito, panel admin (Vue + Vue Router + SCSS + Vite)
```

## Cómo correrlo

Necesitas dos terminales abiertas, una por proyecto.

**Backend**
```bash
cd backend
npm install
cp .env.example .env   # y poner ahí la URI real de MongoDB Atlas
npm run dev
```

**Frontend**
```bash
cd frontend
npm install
npm run dev
```

El frontend espera el backend corriendo en `http://localhost:3001`.


## Estado del proyecto por semana

- **Semana 11**: modelos, conexión a MongoDB Atlas y endpoints REST documentados con Swagger (`/api-docs`) — completo.
- **Semana 12**: CRUD completo de categorías y productos, verificado de punta a punta:
  - Creación y eliminación de categorías y productos vía Postman/Swagger
  - Catálogo del frontend consumiendo la API real, con filtro por categoría funcionando
  - Panel de administrador (crear/eliminar producto) sincronizado en tiempo real con el catálogo, sin recargar la página
  - Completo.
