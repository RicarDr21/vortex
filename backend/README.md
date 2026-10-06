# Vortex — Backend

API REST de Vortex (tienda de ropa online). Node.js + Express + MongoDB Atlas (Mongoose).

## Requisitos

- Node.js instalado
- Una base de datos en MongoDB Atlas

## Cómo correrlo

1. Clonar el repo:
```bash
   git clone <url-de-este-repo>
   cd vortex/backend
```
2. Instalar dependencias:
```bash
   npm install
```
3. Crear un archivo `.env` copiando `.env.example` y poner ahí la cadena de conexión real de MongoDB Atlas y las credenciales del administrador:
```bash
   cp .env.example .env
```
4. Correr en modo desarrollo:
```bash
   npm run dev
```
5. Probar que funciona entrando a `http://localhost:3001/api/health`

## Variables de entorno

- `PORT`: puerto del servidor (por defecto 3001)
- `MONGO_URI`: cadena de conexión de MongoDB Atlas
- `ADMIN_USER` y `ADMIN_PASSWORD`: credenciales del administrador
- `ADMIN_TOKEN`: token que se entrega al hacer login

## Documentación de la API

Swagger/OpenAPI disponible en `http://localhost:3001/api-docs`.

## Estructura

```
src/
  config/db.js          -> conexión a MongoDB
  config/swagger.js     -> configuración de Swagger
  middleware/           -> verificación del token de administrador
  models/               -> esquemas de Mongoose (Categoria, Producto, Carrito, ItemCarrito)
  controllers/          -> lógica de cada recurso
  routes/               -> rutas de la API
  index.js              -> arranque del servidor
```

## Endpoints disponibles

- `GET /api/health`
- `POST /api/auth/login` (devuelve el token del administrador)
- `GET /api/categorias` · `POST /api/categorias` · `PUT /api/categorias/:id` · `DELETE /api/categorias/:id`
- `GET /api/productos` (acepta `?categoriaId=` para filtrar) · `POST /api/productos` · `PUT /api/productos/:id` · `DELETE /api/productos/:id`
- `GET /api/carrito/:sessionId` · `POST /api/carrito/:sessionId/items` · `PUT /api/carrito/items/:itemId` · `DELETE /api/carrito/items/:itemId`

Los endpoints que crean, editan o eliminan categorías y productos requieren el token de administrador (`Authorization: Bearer <token>`).

Pendiente: seguridad (HTTPS, XSS, CSRF).