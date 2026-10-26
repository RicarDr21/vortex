const swaggerJsdoc = require("swagger-jsdoc");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Vortex API",
      version: "1.0.0",
      description: "API REST de la tienda Vortex (categorías, productos, carrito)",
    },
    servers: [
      { url: "http://localhost:3001/api", description: "Servidor local" },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
        },
      },
      schemas: {
        Categoria: {
          type: "object",
          properties: {
            _id: { type: "string" },
            nombre: { type: "string" },
            descripcion: { type: "string" },
          },
        },
        Pedido: {
          type: "object",
          properties: {
            _id: { type: "string" },
            sessionId: { type: "string" },
            cliente: {
              type: "object",
              properties: {
                nombre: { type: "string" },
                telefono: { type: "string" },
                ciudad: { type: "string" },
                direccion: { type: "string" },
                notas: { type: "string" },
              },
            },
            metodoPago: { type: "string", enum: ["Contra entrega", "Transferencia bancaria", "Pago en tienda"] },
            items: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  productoId: { type: "string" },
                  nombre: { type: "string" },
                  color: { type: "string" },
                  talla: { type: "string" },
                  imagen: { type: "string" },
                  cantidad: { type: "number" },
                  precioUnitario: { type: "number" },
                },
              },
            },
            total: { type: "number" },
            estado: { type: "string", enum: ["pendiente", "enviado", "entregado", "cancelado"] },
            fecha: { type: "string", format: "date-time" },
          },
        },
        Producto: {
          type: "object",
          properties: {
            _id: { type: "string" },
            nombre: { type: "string" },
            descripcion: { type: "string" },
            precio: { type: "number" },
            stock: { type: "number" },
            imagen: { type: "string" },
            talla: { type: "string", enum: ["XS", "S", "M", "L", "XL"] },
            color: { type: "string" },
            genero: { type: "string", enum: ["hombre", "mujer", "unisex"] },
            categoriaId: { type: "string" },
          },
        },
      },
    },
  },
  apis: ["./src/routes/*.js"],
};

module.exports = swaggerJsdoc(options);