<script setup>
import { ref, onMounted } from "vue";
import { obtenerProductos, obtenerCategorias } from "../services/api";

const productos = ref([]);
const categorias = ref([]);
const categoriaSeleccionada = ref("");

async function cargarProductos() {
  productos.value = await obtenerProductos(categoriaSeleccionada.value || undefined);
}

onMounted(async () => {
  categorias.value = await obtenerCategorias();
  await cargarProductos();
});
</script>

<template>
  <section>
    <h2>Catálogo</h2>

    <select v-model="categoriaSeleccionada" @change="cargarProductos">
      <option value="">Todas las categorías</option>
      <option v-for="cat in categorias" :key="cat._id" :value="cat._id">{{ cat.nombre }}</option>
    </select>

    <p v-if="productos.length === 0">Todavía no hay productos cargados.</p>

    <div class="grid-productos">
      <div v-for="producto in productos" :key="producto._id" class="producto-card">
        <h3>{{ producto.nombre }}</h3>
        <p>{{ producto.color }} · Talla {{ producto.talla }}</p>
        <p class="precio">${{ producto.precio }}</p>
      </div>
    </div>
  </section>
</template>
