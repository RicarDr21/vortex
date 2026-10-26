const express = require("express");
const router = express.Router();
const pedidosController = require("../controllers/pedidos.controller");
const verificarToken = require("../middleware/auth.middleware");

/**
 * @swagger
 * tags:
 *   name: Pedidos
 *   description: Registro e historial de pedidos
 */

/**
 * @swagger
 * /pedidos:
 *   get:
 *     summary: Historial de pedidos, del más reciente al más antiguo (requiere autenticación)
 *     tags: [Pedidos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: estado
 *         required: false
 *         schema:
 *           type: string
 *           enum: [pendiente, enviado, entregado, cancelado]
 *         description: Filtra por estado del pedido
 *     responses:
 *       200:
 *         description: Lista de pedidos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Pedido'
 *       401:
 *         description: No autorizado
 */
router.get("/", verificarToken, pedidosController.listar);

/**
 * @swagger
 * /pedidos/{sessionId}:
 *   post:
 *     summary: Crea un pedido con los productos del carrito de la sesión y vacía el carrito
 *     description: Los precios y productos se toman del carrito guardado en el servidor, no del cuerpo de la petición. No procesa pagos.
 *     tags: [Pedidos]
 *     parameters:
 *       - in: path
 *         name: sessionId
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [nombre, telefono, ciudad, direccion, metodoPago]
 *             properties:
 *               nombre:
 *                 type: string
 *                 example: Laura Gómez
 *               telefono:
 *                 type: string
 *                 example: "3001234567"
 *               ciudad:
 *                 type: string
 *                 example: Bucaramanga
 *               direccion:
 *                 type: string
 *                 example: Calle 45 # 12-30
 *               notas:
 *                 type: string
 *               metodoPago:
 *                 type: string
 *                 enum: [Contra entrega, Transferencia bancaria, Pago en tienda]
 *     responses:
 *       201:
 *         description: Pedido creado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Pedido'
 *       400:
 *         description: Datos no válidos o carrito vacío
 */
router.post("/:sessionId", pedidosController.crear);

/**
 * @swagger
 * /pedidos/{id}/estado:
 *   patch:
 *     summary: Cambia el estado de un pedido (requiere autenticación)
 *     tags: [Pedidos]
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
 *             type: object
 *             required: [estado]
 *             properties:
 *               estado:
 *                 type: string
 *                 enum: [pendiente, enviado, entregado, cancelado]
 *     responses:
 *       200:
 *         description: Pedido actualizado
 *       400:
 *         description: Estado no válido
 *       401:
 *         description: No autorizado
 *       404:
 *         description: Pedido no encontrado
 */
router.patch("/:id/estado", verificarToken, pedidosController.cambiarEstado);

module.exports = router;
