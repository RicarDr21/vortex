require("dotenv").config();
const express = require("express");
const cors = require("cors");
const conectarDB = require("./config/db");
const categoriasRoutes = require("./routes/categorias.routes");
const productosRoutes = require("./routes/productos.routes");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/api/health", (req, res) => {
  res.json({ estado: "ok", mensaje: "API de Vortex funcionando" });
});

app.use("/api/categorias", categoriasRoutes);
app.use("/api/productos", productosRoutes);

const PORT = process.env.PORT || 3001;

conectarDB().then(() => {
  app.listen(PORT, () => console.log(`Servidor corriendo en el puerto ${PORT}`));
});
