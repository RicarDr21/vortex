# Vortex

Tienda de ropa en línea — proyecto de aula (reemplaza el Examen Final).

Backend y frontend viven en este mismo repositorio pero son dos proyectos independientes: cada uno tiene su propio `package.json` y se corre por separado. La única comunicación entre ellos es por la API REST (HTTP/JSON), el backend nunca renderiza vistas.

## Integrantes

- Santiago Antolinez — backend
- Caren Diaz — frontend
- David Hernández — integración, documentación y despliegue

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

Cada carpeta tiene su propio README con más detalle.
