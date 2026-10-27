const cors = require("cors");
const helmet = require("helmet");

function obtenerOrigenesPermitidos() {
  const produccion = process.env.NODE_ENV === "production";
  const predeterminados = produccion
    ? []
    : [
        "http://localhost:5173",
        "http://127.0.0.1:5173",
        "http://localhost:5174",
        "http://127.0.0.1:5174",
        "http://localhost:3001",
        "http://127.0.0.1:3001",
        "https://localhost:3443", // Añadido para el servidor HTTPS local (Parte 1)[cite: 2]
        "https://127.0.0.1:3443",
      ];
  const configurados = [process.env.APP_ORIGIN, process.env.API_ORIGIN]
    .filter(Boolean)
    .flatMap((valor) => valor.split(","));

  return new Set(
    [...predeterminados, ...configurados]
      .map((origen) => {
        try {
          return new URL(origen.trim()).origin;
        } catch {
          return "";
        }
      })
      .filter(Boolean),
  );
}

function configurarSeguridad(app) {
  const produccion = process.env.NODE_ENV === "production";
  const origenesPermitidos = obtenerOrigenesPermitidos();
  const apiOrigen = process.env.API_ORIGIN;
  const origenesConexion = ["'self'"];

  if (apiOrigen) origenesConexion.push(new URL(apiOrigen).origin);
  if (!produccion && !apiOrigen) origenesConexion.push("https://localhost:3443");

  app.set("trust proxy", produccion ? 1 : 0);
  app.use(
    helmet({
      contentSecurityPolicy: {
        directives: {
          defaultSrc: ["'self'"],
          baseUri: ["'self'"],
          connectSrc: origenesConexion,
          fontSrc: ["'self'", "https://fonts.gstatic.com"],
          formAction: ["'self'"],
          frameAncestors: ["'none'"],
          imgSrc: ["'self'", "data:", "https:"],
          objectSrc: ["'none'"],
          scriptSrc: ["'self'"],
          styleSrc: ["'self'", "https://fonts.googleapis.com"],
          ...(produccion
            ? { upgradeInsecureRequests: [] }
            : { upgradeInsecureRequests: null }),
        },
      },
      hsts: produccion ? { maxAge: 31536000, includeSubDomains: true } : false,
    }),
  );
  app.use(
    cors({
      origin(origen, callback) {
        // Permitir peticiones sin origen (como Postman o apps móviles) solo en desarrollo
        if (!origen && !produccion) return callback(null, true);
        callback(null, Boolean(origen && origenesPermitidos.has(origen)));
      },
      methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
      // CRÍTICO: Se añade "X-CSRF-Token" para permitir la cabecera anti-CSRF (Parte 5)[cite: 7]
      allowedHeaders: ["Content-Type", "Authorization", "X-CSRF-Token"],
      credentials: true, // Necesario para que viajen las cookies seguras y HttpOnly[cite: 7, 8]
    }),
  );
  app.use((req, res, next) => {
    if (produccion && !req.secure) {
      return res.status(426).json({ mensaje: "HTTPS es obligatorio." });
    }

    // Validación opcional de origen para métodos de modificación
    if (["POST", "PUT", "PATCH", "DELETE"].includes(req.method)) {
      const origen = req.get("Origin");
      if (produccion && (!origen || !origenesPermitidos.has(origen))) {
        return res.status(403).json({ mensaje: "Origen no permitido." });
      }
    }

    next();
  });
}

module.exports = configurarSeguridad;