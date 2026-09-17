# Vortex — Backend

API REST de Vortex (tienda de ropa online). Node.js + Express + MongoDB Atlas (Mongoose).

## Requisitos

- Node.js instalado
- Una base de datos en MongoDB Atlas

## Cómo correrlo

1. Clonar el repo:
   ```bash
   git clone <url-de-este-repo>
   cd vortex-backend
   ```
2. Instalar dependencias:
   ```bash
   npm install
   ```
3. Crear un archivo `.env` copiando `.env.example` y poner ahí la cadena de conexión real de MongoDB Atlas:
   ```bash
   cp .env.example .env
   ```
4. Correr en modo desarrollo:
   ```bash
   npm run dev
   ```
5. Probar que funciona entrando a `http://localhost:3001/api/health`

## Estructura

```
src/
  config/db.js          -> conexión a MongoDB
  models/                -> esquemas de Mongoose (Categoria, Producto, Carrito, ItemCarrito)
  controllers/            -> lógica de cada recurso
  routes/                  -> rutas de la API
  index.js                 -> arranque del servidor
```

## Endpoints disponibles (semana 11)

- `GET /api/health`
- `GET /api/categorias` · `POST /api/categorias` · `PUT /api/categorias/:id` · `DELETE /api/categorias/:id`
- `GET /api/productos` (acepta `?categoriaId=` para filtrar) · `POST /api/productos` · `PUT /api/productos/:id` · `DELETE /api/productos/:id`

Pendiente: documentación con Swagger, seguridad (HTTPS, XSS, CSRF), carrito de compras.
