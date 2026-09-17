# Vortex — Frontend

Catálogo, carrito y panel de administrador de Vortex (tienda de ropa online). HTML + JavaScript vanilla + SCSS, con Vite como gestor de dependencias/automatizador.

## Requisitos

- Node.js instalado
- El backend (`vortex-backend`) corriendo en `http://localhost:3001`

## Cómo correrlo

1. Clonar el repo:
   ```bash
   git clone <url-de-este-repo>
   cd vortex-frontend
   ```
2. Instalar dependencias:
   ```bash
   npm install
   ```
3. Correr en modo desarrollo:
   ```bash
   npm run dev
   ```
4. Abrir `http://localhost:5173` en el navegador (con el backend ya corriendo)

## Estructura

```
index.html               -> página principal
src/
  main.js                 -> lógica de la página (carga productos desde la API)
  services/api.js          -> funciones que llaman al backend
  styles/main.scss          -> estilos con SCSS
```

Pendiente: panel de administrador, carrito de compras, migrar el resto de los estilos.
