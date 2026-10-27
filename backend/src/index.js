require("dotenv").config();
const path = require("path");
const fs = require("fs");
const https = require("https");
const http = require("http");
const crypto = require("crypto");
const express = require("express");
const cookieParser = require("cookie-parser");
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./config/swagger");
const conectarDB = require("./config/db");
const configurarSeguridad = require("./middleware/security.middleware");
const categoriasRoutes = require("./routes/categorias.routes");
const productosRoutes = require("./routes/productos.routes");
const carritoRoutes = require("./routes/carrito.routes");
const authRoutes = require("./routes/auth.routes");
const pedidosRoutes = require("./routes/pedidos.routes");

const app = express();

// Archivos estáticos e imágenes con cabecera de recursos cruzados
app.use(
  "/uploads",
  (req, res, next) => {
    res.setHeader("Cross-Origin-Resource-Policy", "cross-origin");
    next();
  },
  express.static(path.join(__dirname, "../uploads")),
);

// Aplicar configuraciones de seguridad (Helmet, CORS, Rate Limit general, etc.)
configurarSeguridad(app);

// Middlewares esenciales de parsing
app.use(express.json());
app.use(cookieParser());

// ---------------------------------------------------------
// PARTE 5: Middleware anti-CSRF (Doble envío de cookie/header)
// ---------------------------------------------------------
function verificarCSRF(req, res, next) {
  if (['GET', 'HEAD', 'OPTIONS'].includes(req.method)) return next();
  if (req.path === '/auth/login' || req.path === '/auth/registro') return next();

  const cookieCsrf = req.cookies.csrf || '';
  const headerCsrf = req.headers['x-csrf-token'] || '';

  if (
    cookieCsrf.length > 0 &&
    cookieCsrf.length === headerCsrf.length &&
    crypto.timingSafeEqual(Buffer.from(cookieCsrf), Buffer.from(headerCsrf))
  ) {
    return next();
  }
  return res.status(403).json({ error: 'Petición rechazada por seguridad CSRF' });
}

// Health check público
app.get("/api/health", (req, res) => {
  res.json({ estado: "ok", mensaje: "API de Vortex funcionando" });
});

// Documentación Swagger
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Aplicar protección CSRF únicamente a las rutas de la API bajo /api
app.use("/api", verificarCSRF);

// Montaje de rutas de la API
app.use("/api/categorias", categoriasRoutes);
app.use("/api/productos", productosRoutes);
app.use("/api/carrito", carritoRoutes);
app.use("/api/pedidos", pedidosRoutes);
app.use("/api/auth", authRoutes);

// ---------------------------------------------------------
// PARTE 6.4: Manejador global de errores (Siempre al final)
// ---------------------------------------------------------
app.use((err, req, res, next) => {
  console.error(new Date().toISOString(), req.method, req.url, err); // Detalle guardado en el log del servidor
  res.status(500).json({ error: 'Error interno del servidor' }); // Respuesta genérica hacia afuera[cite: 8]
});

const PORT_HTTPS = process.env.PORT || 3443;
const PORT_HTTP = 3000;

if (require.main === module) {
  conectarDB().then(() => {
    // ---------------------------------------------------------
    // PARTE 1: Inicialización de HTTPS local y Redirección HTTP
    // ---------------------------------------------------------
    try {
      const opcionesCerts = {
        key: fs.readFileSync(path.join(__dirname, '../certs/key.pem')),
        cert: fs.readFileSync(path.join(__dirname, '../certs/cert.pem'))
      };

      // Servidor seguro HTTPS (Puerto 3443)
      https.createServer(opcionesCerts, app).listen(PORT_HTTPS, () => {
        console.log(`Servidor seguro HTTPS corriendo en https://localhost:${PORT_HTTPS}`);
      });

      // Servidor de redirección HTTP a HTTPS (Puerto 3000)[cite: 2]
      http.createServer((req, res) => {
        res.writeHead(301, { 'Location': `https://localhost:${PORT_HTTPS}${req.url}` });
        res.end();
      }).listen(PORT_HTTP, () => {
        console.log(`Redirección HTTP activa en http://localhost:${PORT_HTTP}`);
      });

    } catch (error) {
      console.warn("No se encontraron los certificados SSL en 'certs/'. Iniciando en modo HTTP estándar...");
      app.listen(PORT_HTTPS, () => {
        console.log(`Servidor corriendo en http://localhost:${PORT_HTTPS}`);
      });
    }
  });
}

module.exports = app;