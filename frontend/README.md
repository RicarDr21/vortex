# Vortex — Frontend (Vue)

Catálogo, carrito y panel de administrador de Vortex (tienda de ropa online). Vue 3 + Vue Router + SCSS, con Vite como gestor de dependencias/automatizador.

## Requisitos

- Node.js instalado
- El backend (`../backend`) corriendo en `http://localhost:3001`

## Cómo correrlo

```bash
npm install
npm run dev
```

Abrir `http://localhost:5173` en el navegador (con el backend ya corriendo).

## Estructura

```
index.html                 -> punto de montaje de Vue
src/
  main.js                   -> arranque de la app
  App.vue                    -> layout y navegación
  router/index.js             -> rutas: catálogo, carrito, admin
  views/
    Catalogo.vue               -> catálogo público, filtra por categoría
    Carrito.vue                 -> carrito de compras (pendiente semana 13)
    Admin.vue                    -> panel de administrador (crear/eliminar productos)
  services/api.js               -> funciones que llaman al backend
  styles/main.scss               -> estilos con SCSS
```

Pendiente: carrito de compras conectado a la API, editar productos (hoy solo crea y elimina), estilos del panel admin.
