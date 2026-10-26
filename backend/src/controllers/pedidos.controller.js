const Carrito = require("../models/Carrito");
const ItemCarrito = require("../models/ItemCarrito");
const Pedido = require("../models/Pedido");

const ESTADOS = ["pendiente", "enviado", "entregado", "cancelado"];
const METODOS = ["Contra entrega", "Transferencia bancaria", "Pago en tienda"];

function texto(valor) {
  return typeof valor === "string" ? valor.trim() : "";
}

// Crea el pedido a partir del carrito de la sesión y lo vacía.
// Los precios salen de la base de datos, nunca del cuerpo de la petición.
exports.crear = async (req, res) => {
  try {
    const { sessionId } = req.params;
    const { nombre, telefono, ciudad, direccion, notas, metodoPago } = req.body;

    const errores = {};
    if (texto(nombre).length < 3) errores.nombre = "Escribe tu nombre completo";
    if (!/^[0-9+\s-]{7,15}$/.test(texto(telefono))) errores.telefono = "Teléfono no válido";
    if (texto(direccion).length < 5) errores.direccion = "Escribe tu dirección";
    if (!texto(ciudad)) errores.ciudad = "Escribe tu ciudad";
    if (!METODOS.includes(metodoPago)) errores.metodoPago = "Elige un método de pago";
    if (Object.keys(errores).length) {
      return res.status(400).json({ mensaje: "Datos del pedido no válidos", errores });
    }

    const carrito = await Carrito.findOne({ sessionId });
    const items = carrito
      ? await ItemCarrito.find({ carritoId: carrito._id }).populate("productoId")
      : [];
    const validos = items.filter((item) => item.productoId);
    if (!validos.length) {
      return res.status(400).json({ mensaje: "Tu carrito está vacío" });
    }

    const lineas = validos.map((item) => ({
      productoId: item.productoId._id,
      nombre: item.productoId.nombre,
      color: item.productoId.color,
      talla: item.productoId.talla,
      imagen: item.productoId.imagen,
      cantidad: item.cantidad,
      precioUnitario: item.precioUnitario,
    }));
    const total = lineas.reduce((suma, l) => suma + l.precioUnitario * l.cantidad, 0);

    const pedido = await Pedido.create({
      sessionId,
      cliente: {
        nombre: texto(nombre),
        telefono: texto(telefono),
        ciudad: texto(ciudad),
        direccion: texto(direccion),
        notas: texto(notas),
      },
      metodoPago,
      items: lineas,
      total,
    });

    await ItemCarrito.deleteMany({ carritoId: carrito._id });
    res.status(201).json(pedido);
  } catch (error) {
    res.status(500).json({ mensaje: "No se pudo registrar el pedido", error: error.message });
  }
};

// Historial completo (solo admin), del más reciente al más antiguo.
exports.listar = async (req, res) => {
  try {
    const filtro = {};
    if (req.query.estado) {
      if (!ESTADOS.includes(req.query.estado)) {
        return res.status(400).json({ mensaje: "Estado no válido" });
      }
      filtro.estado = req.query.estado;
    }
    const pedidos = await Pedido.find(filtro).sort({ fecha: -1 });
    res.json(pedidos);
  } catch (error) {
    res.status(500).json({ mensaje: "No se pudieron cargar los pedidos", error: error.message });
  }
};

exports.cambiarEstado = async (req, res) => {
  try {
    const { estado } = req.body;
    if (!ESTADOS.includes(estado)) {
      return res.status(400).json({ mensaje: "Estado no válido" });
    }
    const pedido = await Pedido.findByIdAndUpdate(req.params.id, { estado }, { new: true });
    if (!pedido) return res.status(404).json({ mensaje: "Pedido no encontrado" });
    res.json(pedido);
  } catch (error) {
    res.status(400).json({ mensaje: "No se pudo actualizar el pedido", error: error.message });
  }
};
