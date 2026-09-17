import { createRouter, createWebHistory } from "vue-router";
import Catalogo from "../views/Catalogo.vue";
import Carrito from "../views/Carrito.vue";
import Admin from "../views/Admin.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", name: "catalogo", component: Catalogo },
    { path: "/carrito", name: "carrito", component: Carrito },
    { path: "/admin", name: "admin", component: Admin },
  ],
});

export default router;
