const API_URL = "http://localhost:3001/api";

export async function obtenerEstado() {
  const res = await fetch(`${API_URL}/health`);
  return res.json();
}

export async function obtenerProductos(categoriaId) {
  const url = categoriaId ? `${API_URL}/productos?categoriaId=${categoriaId}` : `${API_URL}/productos`;
  const res = await fetch(url);
  return res.json();
}

export async function obtenerCategorias() {
  const res = await fetch(`${API_URL}/categorias`);
  return res.json();
}

export async function crearProducto(producto) {
  const res = await fetch(`${API_URL}/productos`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(producto),
  });
  return res.json();
}

export async function eliminarProducto(id) {
  const res = await fetch(`${API_URL}/productos/${id}`, { method: "DELETE" });
  return res.json();
}
