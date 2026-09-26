const express = require("express");
const router = express.Router();
const categoriasController = require("../controllers/categorias.controller");

/**
 * @swagger
 * tags:
 *   name: Categorias
 *   description: Gestión de categorías de productos
 */

/**
 * @swagger
 * /categorias:
 *   get:
 *     summary: Lista todas las categorías
 *     tags: [Categorias]
 *     responses:
 *       200:
 *         description: Lista de categorías
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Categoria'
 */
router.get("/", categoriasController.listar);

/**
 * @swagger
 * /categorias:
 *   post:
 *     summary: Crea una nueva categoría
 *     tags: [Categorias]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Categoria'
 *     responses:
 *       201:
 *         description: Categoría creada
 */
router.post("/", categoriasController.crear);

/**
 * @swagger
 * /categorias/{id}:
 *   put:
 *     summary: Actualiza una categoría existente
 *     tags: [Categorias]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Categoria'
 *     responses:
 *       200:
 *         description: Categoría actualizada
 *       404:
 *         description: Categoría no encontrada
 */
router.put("/:id", categoriasController.actualizar);

/**
 * @swagger
 * /categorias/{id}:
 *   delete:
 *     summary: Elimina una categoría
 *     tags: [Categorias]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Categoría eliminada
 *       404:
 *         description: Categoría no encontrada
 */
router.delete("/:id", categoriasController.eliminar);

module.exports = router;