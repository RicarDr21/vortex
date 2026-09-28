<script setup>
import { ref, onMounted } from "vue";
import {
  obtenerProductos, crearProducto, actualizarProducto, eliminarProducto,
  obtenerCategorias, crearCategoria, eliminarCategoria,
  login, logout, estaAutenticado,
} from "../services/api";

const autenticado = ref(estaAutenticado());
const usuario = ref("");
const contrasena = ref("");
const errorLogin = ref("");

const productos = ref([]);
const categorias = ref([]);
const editandoId = ref(null);

const formProducto = ref({
  nombre: "", precio: 0, stock: 0, talla: "M", color: "", genero: "unisex", categoriaId: "",
});

const nuevaCategoria = ref({ nombre: "", descripcion: "" });

async function cargarDatos() {
  productos.value = await obtenerProductos();
  categorias.value = await obtenerCategorias();
}

async function iniciarSesion() {
  errorLogin.value = "";
  const resultado = await login(usuario.value, contrasena.value);
  if (resultado.ok) {
    autenticado.value = true;
    await cargarDatos();
  } else {
    errorLogin.value = resultado.data.mensaje || "Error al iniciar sesión";
  }
}

function cerrarSesion() {
  logout();
  autenticado.value = false;
}

function limpiarFormProducto() {
  formProducto.value = { nombre: "", precio: 0, stock: 0, talla: "M", color: "", genero: "unisex", categoriaId: "" };
  editandoId.value = null;
}

async function guardarProducto() {
  if (editandoId.value) {
    await actualizarProducto(editandoId.value, formProducto.value);
  } else {
    await crearProducto(formProducto.value);
  }
  limpiarFormProducto();
  await cargarDatos();
}

function editarProducto(producto) {
  editandoId.value = producto._id;
  formProducto.value = {
    nombre: producto.nombre,
    precio: producto.precio,
    stock: producto.stock,
    talla: producto.talla,
    color: producto.color || "",
    genero: producto.genero,
    categoriaId: producto.categoriaId?._id || producto.categoriaId,
  };
}

async function borrarProducto(id) {
  await eliminarProducto(id);
  await cargarDatos();
}

async function agregarCategoria() {
  await crearCategoria(nuevaCategoria.value);
  nuevaCategoria.value = { nombre: "", descripcion: "" };
  await cargarDatos();
}

async function borrarCategoria(id) {
  await eliminarCategoria(id);
  await cargarDatos();
}

onMounted(() => {
  if (autenticado.value) cargarDatos();
});
</script>

<template>
  <section v-if="!autenticado">
    <h2>Acceso administrador</h2>
    <form @submit.prevent="iniciarSesion">
      <input v-model="usuario" placeholder="Usuario" required />
      <input v-model="contrasena" type="password" placeholder="Contraseña" required />
      <button type="submit">Ingresar</button>
    </form>
    <p v-if="errorLogin" class="error">{{ errorLogin }}</p>
  </section>

  <section v-else>
    <div class="admin-header">
      <h2>Panel de administrador</h2>
      <button @click="cerrarSesion">Cerrar sesión</button>
    </div>

    <h3>{{ editandoId ? "Editar producto" : "Nuevo producto" }}</h3>
    <form @submit.prevent="guardarProducto">
      <input v-model="formProducto.nombre" placeholder="Nombre" required />
      <input v-model.number="formProducto.precio" type="number" placeholder="Precio" required />
      <input v-model.number="formProducto.stock" type="number" placeholder="Stock" required />
      <select v-model="formProducto.talla">
        <option>XS</option><option>S</option><option>M</option><option>L</option><option>XL</option>
      </select>
      <input v-model="formProducto.color" placeholder="Color" />
      <select v-model="formProducto.genero">
        <option value="hombre">Hombre</option>
        <option value="mujer">Mujer</option>
        <option value="unisex">Unisex</option>
      </select>
      <select v-model="formProducto.categoriaId" required>
        <option value="" disabled>Categoría</option>
        <option v-for="cat in categorias" :key="cat._id" :value="cat._id">{{ cat.nombre }}</option>
      </select>
      <button type="submit">{{ editandoId ? "Guardar cambios" : "Agregar producto" }}</button>
      <button v-if="editandoId" type="button" @click="limpiarFormProducto">Cancelar</button>
    </form>

    <table>
      <tbody>
        <tr v-for="producto in productos" :key="producto._id">
          <td>{{ producto.nombre }}</td>
          <td>${{ producto.precio }}</td>
          <td>{{ producto.stock }}</td>
          <td><button @click="editarProducto(producto)">Editar</button></td>
          <td><button @click="borrarProducto(producto._id)">Eliminar</button></td>
        </tr>
      </tbody>
    </table>

    <h3>Categorías</h3>
    <form @submit.prevent="agregarCategoria">
      <input v-model="nuevaCategoria.nombre" placeholder="Nombre de categoría" required />
      <input v-model="nuevaCategoria.descripcion" placeholder="Descripción" />
      <button type="submit">Agregar categoría</button>
    </form>

    <table>
      <tbody>
        <tr v-for="cat in categorias" :key="cat._id">
          <td>{{ cat.nombre }}</td>
          <td>{{ cat.descripcion }}</td>
          <td><button @click="borrarCategoria(cat._id)">Eliminar</button></td>
        </tr>
      </tbody>
    </table>
  </section>
</template>