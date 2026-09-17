<script setup>
import { ref, onMounted } from "vue";
import { obtenerEstado } from "./services/api";

const estadoApi = ref("Conectando con el servidor...");

onMounted(async () => {
  try {
    const estado = await obtenerEstado();
    estadoApi.value = estado.mensaje;
  } catch (error) {
    estadoApi.value = "No se pudo conectar con el servidor (¿está corriendo el backend?)";
  }
});
</script>

<template>
  <header class="header">
    <h1>Vortex</h1>
    <p class="estado-api">{{ estadoApi }}</p>
    <nav>
      <RouterLink to="/">Catálogo</RouterLink>
      <RouterLink to="/carrito">Carrito</RouterLink>
      <RouterLink to="/admin">Admin</RouterLink>
    </nav>
  </header>

  <main>
    <RouterView />
  </main>
</template>
