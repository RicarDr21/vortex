const mongoose = require("mongoose");

const itemPedidoSchema = new mongoose.Schema(
  {
    productoId: { type: mongoose.Schema.Types.ObjectId, ref: "Producto" },
    // Copia de los datos al momento de comprar: el historial no cambia si luego
    // se edita o se borra el producto.
    nombre: { type: String, required: true },
    color: { type: String },
    talla: { type: String },
    imagen: { type: String },
    cantidad: { type: Number, required: true, min: 1 },
    precioUnitario: { type: Number, required: true, min: 0 },
  },
  { _id: false },
);

const pedidoSchema = new mongoose.Schema({
  sessionId: { type: String, required: true, index: true },
  cliente: {
    nombre: { type: String, required: true, trim: true, maxlength: 100 },
    telefono: { type: String, required: true, trim: true, maxlength: 20 },
    ciudad: { type: String, required: true, trim: true, maxlength: 80 },
    direccion: { type: String, required: true, trim: true, maxlength: 200 },
    notas: { type: String, trim: true, maxlength: 300 },
  },
  metodoPago: {
    type: String,
    required: true,
    enum: ["Contra entrega", "Transferencia bancaria", "Pago en tienda"],
  },
  items: { type: [itemPedidoSchema], required: true },
  total: { type: Number, required: true, min: 0 },
  estado: {
    type: String,
    enum: ["pendiente", "enviado", "entregado", "cancelado"],
    default: "pendiente",
  },
  fecha: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Pedido", pedidoSchema);
