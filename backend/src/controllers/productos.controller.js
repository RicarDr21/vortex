const Producto = require("../models/Producto");

async function listar(req, res) {
  const filtro = {};
  if (req.query.categoriaId) filtro.categoriaId = req.query.categoriaId;
  const productos = await Producto.find(filtro).populate("categoriaId");
  res.json(productos);
}

async function crear(req, res) {
  const producto = await Producto.create(req.body);
  res.status(201).json(producto);
}

async function actualizar(req, res) {
  const producto = await Producto.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!producto) return res.status(404).json({ mensaje: "Producto no encontrado" });
  res.json(producto);
}

async function eliminar(req, res) {
  const producto = await Producto.findByIdAndDelete(req.params.id);
  if (!producto) return res.status(404).json({ mensaje: "Producto no encontrado" });
  res.json({ mensaje: "Producto eliminado" });
}

module.exports = { listar, crear, actualizar, eliminar };
