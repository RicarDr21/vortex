<script setup>
import { ref, onMounted } from "vue";
import { obtenerCarrito, actualizarCantidadCarrito, eliminarDelCarrito } from "../services/api";

const items = ref([]);
const total = ref(0);
const cargando = ref(true);

async function cargarCarrito() {
  cargando.value = true;
  const carrito = await obtenerCarrito();
  items.value = carrito.items;
  total.value = carrito.total;
  cargando.value = false;
}

async function cambiarCantidad(item, nuevaCantidad) {
  if (nuevaCantidad < 1) return;
  await actualizarCantidadCarrito(item._id, nuevaCantidad);
  await cargarCarrito();
}

async function quitar(item) {
  await eliminarDelCarrito(item._id);
  await cargarCarrito();
}

onMounted(cargarCarrito);
</script>

<template>
  <section>
    <h2>Carrito de compras</h2>

    <p v-if="cargando">Cargando...</p>
    <p v-else-if="items.length === 0">Tu carrito está vacío.</p>

    <div v-else>
      <div v-for="item in items" :key="item._id" class="item-carrito">
        <h3>{{ item.productoId.nombre }}</h3>
        <p>Precio unitario: ${{ item.precioUnitario }}</p>
        <div class="cantidad-controles">
          <button @click="cambiarCantidad(item, item.cantidad - 1)">-</button>
          <span>{{ item.cantidad }}</span>
          <button @click="cambiarCantidad(item, item.cantidad + 1)">+</button>
        </div>
        <p>Subtotal: ${{ item.precioUnitario * item.cantidad }}</p>
        <button @click="quitar(item)">Quitar</button>
      </div>
    </div>

    <p class="precio">Total: ${{ total }}</p>
  </section>
</template>