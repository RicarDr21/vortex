<script setup>
import { ref, onMounted } from "vue";
import { obtenerProductos, obtenerCategorias, crearProducto, eliminarProducto } from "../services/api";

const productos = ref([]);
const categorias = ref([]);

const nuevoProducto = ref({
  nombre: "",
  precio: 0,
  stock: 0,
  talla: "M",
  color: "",
  genero: "unisex",
  categoriaId: "",
});

async function cargarDatos() {
  productos.value = await obtenerProductos();
  categorias.value = await obtenerCategorias();
}

async function agregarProducto() {
  await crearProducto(nuevoProducto.value);
  nuevoProducto.value = { nombre: "", precio: 0, stock: 0, talla: "M", color: "", genero: "unisex", categoriaId: "" };
  await cargarDatos();
}

async function borrarProducto(id) {
  await eliminarProducto(id);
  await cargarDatos();
}

onMounted(cargarDatos);
</script>

<template>
  <section>
    <h2>Panel de administrador</h2>

    <form @submit.prevent="agregarProducto">
      <input v-model="nuevoProducto.nombre" placeholder="Nombre" required />
      <input v-model.number="nuevoProducto.precio" type="number" placeholder="Precio" required />
      <input v-model.number="nuevoProducto.stock" type="number" placeholder="Stock" required />
      <select v-model="nuevoProducto.talla">
        <option>XS</option><option>S</option><option>M</option><option>L</option><option>XL</option>
      </select>
      <input v-model="nuevoProducto.color" placeholder="Color" />
      <select v-model="nuevoProducto.genero">
        <option value="hombre">Hombre</option>
        <option value="mujer">Mujer</option>
        <option value="unisex">Unisex</option>
      </select>
      <select v-model="nuevoProducto.categoriaId" required>
        <option value="" disabled>Categoría</option>
        <option v-for="cat in categorias" :key="cat._id" :value="cat._id">{{ cat.nombre }}</option>
      </select>
      <button type="submit">Agregar producto</button>
    </form>

    <table>
      <tbody>
        <tr v-for="producto in productos" :key="producto._id">
          <td>{{ producto.nombre }}</td>
          <td>${{ producto.precio }}</td>
          <td>{{ producto.stock }}</td>
          <td><button @click="borrarProducto(producto._id)">Eliminar</button></td>
        </tr>
      </tbody>
    </table>
  </section>
</template>
