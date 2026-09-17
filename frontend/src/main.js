import "./styles/main.scss";
import { obtenerEstado, obtenerProductos } from "./services/api.js";

async function iniciar() {
  const estadoEl = document.getElementById("estado-api");
  try {
    const estado = await obtenerEstado();
    estadoEl.textContent = estado.mensaje;
  } catch (error) {
    estadoEl.textContent = "No se pudo conectar con el servidor (¿está corriendo el backend?)";
  }

  try {
    const productos = await obtenerProductos();
    renderizarProductos(productos);
  } catch (error) {
    console.error("Error cargando productos:", error);
  }
}

function renderizarProductos(productos) {
  const contenedor = document.getElementById("lista-productos");
  contenedor.innerHTML = "";

  if (productos.length === 0) {
    contenedor.textContent = "Todavía no hay productos cargados.";
    return;
  }

  productos.forEach((producto) => {
    const card = document.createElement("div");
    card.className = "producto-card";
    card.innerHTML = `
      <h3>${producto.nombre}</h3>
      <p>${producto.color || ""} · Talla ${producto.talla}</p>
      <p class="precio">$${producto.precio}</p>
    `;
    contenedor.appendChild(card);
  });
}

iniciar();
