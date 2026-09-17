const Categoria = require("../models/Categoria");

async function listar(req, res) {
  const categorias = await Categoria.find();
  res.json(categorias);
}

async function crear(req, res) {
  const categoria = await Categoria.create(req.body);
  res.status(201).json(categoria);
}

async function actualizar(req, res) {
  const categoria = await Categoria.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!categoria) return res.status(404).json({ mensaje: "Categoria no encontrada" });
  res.json(categoria);
}

async function eliminar(req, res) {
  const categoria = await Categoria.findByIdAndDelete(req.params.id);
  if (!categoria) return res.status(404).json({ mensaje: "Categoria no encontrada" });
  res.json({ mensaje: "Categoria eliminada" });
}

module.exports = { listar, crear, actualizar, eliminar };
