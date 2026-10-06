const API_URL = "http://localhost:3001/api";

function obtenerSessionId() {
  let sessionId = localStorage.getItem("vortex_session_id");
  if (!sessionId) {
    sessionId = crypto.randomUUID();
    localStorage.setItem("vortex_session_id", sessionId);
  }
  return sessionId;
}

function obtenerToken() {
  return localStorage.getItem("vortex_admin_token");
}

function headersAuth() {
  const token = obtenerToken();
  return token ? { Authorization: `Bearer ${token}` } : {};
}

export function estaAutenticado() {
  return !!obtenerToken();
}

export async function login(usuario, contrasena) {
  const res = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ usuario, contrasena }),
  });
  const data = await res.json();
  if (res.ok) {
    localStorage.setItem("vortex_admin_token", data.token);
  }
  return { ok: res.ok, data };
}

export function logout() {
  localStorage.removeItem("vortex_admin_token");
}

export async function obtenerEstado() {
  const res = await fetch(`${API_URL}/health`);
  return res.json();
}

export async function obtenerProductos(categoriaId) {
  const url = categoriaId ? `${API_URL}/productos?categoriaId=${categoriaId}` : `${API_URL}/productos`;
  const res = await fetch(url);
  return res.json();
}

export async function crearProducto(producto) {
  const res = await fetch(`${API_URL}/productos`, {
    method: "POST",
    headers: { "Content-Type": "application/json", ...headersAuth() },
    body: JSON.stringify(producto),
  });
  return res.json();
}

export async function actualizarProducto(id, producto) {
  const res = await fetch(`${API_URL}/productos/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json", ...headersAuth() },
    body: JSON.stringify(producto),
  });
  return res.json();
}

export async function eliminarProducto(id) {
  const res = await fetch(`${API_URL}/productos/${id}`, {
    method: "DELETE",
    headers: { ...headersAuth() },
  });
  return res.json();
}

export async function obtenerCategorias() {
  const res = await fetch(`${API_URL}/categorias`);
  return res.json();
}

export async function crearCategoria(categoria) {
  const res = await fetch(`${API_URL}/categorias`, {
    method: "POST",
    headers: { "Content-Type": "application/json", ...headersAuth() },
    body: JSON.stringify(categoria),
  });
  return res.json();
}

export async function actualizarCategoria(id, categoria) {
  const res = await fetch(`${API_URL}/categorias/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json", ...headersAuth() },
    body: JSON.stringify(categoria),
  });
  return res.json();
}

export async function eliminarCategoria(id) {
  const res = await fetch(`${API_URL}/categorias/${id}`, {
    method: "DELETE",
    headers: { ...headersAuth() },
  });
  return res.json();
}

export async function obtenerCarrito() {
  const sessionId = obtenerSessionId();
  const res = await fetch(`${API_URL}/carrito/${sessionId}`);
  return res.json();
}

export async function agregarAlCarrito(productoId, cantidad = 1) {
  const sessionId = obtenerSessionId();
  const res = await fetch(`${API_URL}/carrito/${sessionId}/items`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ productoId, cantidad }),
  });
  return res.json();
}

export async function actualizarCantidadCarrito(itemId, cantidad) {
  const res = await fetch(`${API_URL}/carrito/items/${itemId}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ cantidad }),
  });
  return res.json();
}

export async function eliminarDelCarrito(itemId) {
  const res = await fetch(`${API_URL}/carrito/items/${itemId}`, { method: "DELETE" });
  return res.json();
}