const express = require("express");
const router = express.Router();
const productosController = require("../controllers/productos.controller");
const verificarToken = require("../middleware/auth.middleware");

/**
 * @swagger
 * tags:
 *   name: Productos
 *   description: Gestión de productos
 */

/**
 * @swagger
 * /productos:
 *   get:
 *     summary: Lista productos, opcionalmente filtrados por categoría
 *     tags: [Productos]
 *     parameters:
 *       - in: query
 *         name: categoriaId
 *         schema:
 *           type: string
 *         required: false
 *         description: Filtra productos por ID de categoría
 *     responses:
 *       200:
 *         description: Lista de productos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Producto'
 */
router.get("/", productosController.listar);

/**
 * @swagger
 * /productos:
 *   post:
 *     summary: Crea un nuevo producto (requiere autenticación)
 *     tags: [Productos]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Producto'
 *     responses:
 *       201:
 *         description: Producto creado
 *       401:
 *         description: No autorizado
 */
router.post("/", verificarToken, productosController.crear);

/**
 * @swagger
 * /productos/{id}:
 *   put:
 *     summary: Actualiza un producto existente (requiere autenticación)
 *     tags: [Productos]
 *     security:
 *       - bearerAuth: []
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
 *             $ref: '#/components/schemas/Producto'
 *     responses:
 *       200:
 *         description: Producto actualizado
 *       401:
 *         description: No autorizado
 *       404:
 *         description: Producto no encontrado
 */
router.put("/:id", verificarToken, productosController.actualizar);

/**
 * @swagger
 * /productos/{id}:
 *   delete:
 *     summary: Elimina un producto (requiere autenticación)
 *     tags: [Productos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Producto eliminado
 *       401:
 *         description: No autorizado
 *       404:
 *         description: Producto no encontrado
 */
router.delete("/:id", verificarToken, productosController.eliminar);

module.exports = router;