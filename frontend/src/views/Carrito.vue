<script setup>
import { ref, computed } from "vue";

// Semana 13: esto se conectará con la API de carrito.
// Por ahora queda como estructura base con datos de ejemplo.
const items = ref([]);

const total = computed(() =>
  items.value.reduce((suma, item) => suma + item.precioUnitario * item.cantidad, 0)
);
</script>

<template>
  <section>
    <h2>Carrito de compras</h2>
    <p v-if="items.length === 0">Tu carrito está vacío. (Pendiente semana 13)</p>
    <p class="precio">Total: ${{ total }}</p>
  </section>
</template>
