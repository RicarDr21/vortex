# INFORME DE SEGURIDAD - TIENDA VORTEX

| Hallazgo | OWASP | Evidencia (cómo lo comprobé) | Corrección aplicada | Estado |
| :--- | :--- | :--- | :--- | :--- |
| Contraseñas en texto plano | A04 - Fallas criptográficas | Revisión del modelo de usuario y base de datos Atlas antes de implementar bcrypt. | Implementación de `bcrypt` con un factor de costo de 12 en el registro. | Corregido |
| Credenciales expuestas | A04 - Fallas criptográficas | Búsqueda de URIs o secretos en el código fuente. | Uso de variables de entorno con `dotenv` y exclusión de `.env` en `.gitignore`. | Corregido |
| Falta de cifrado en tránsito | A04 - Fallas criptográficas | Verificación de acceso HTTP simple en el puerto local. | Configuración de servidor HTTPS local con `mkcert` y redirección automática. | Corregido |
| Exposición de datos por IDOR | A01 - Control de acceso roto | Consulta de pedidos de otro usuario cambiando el ID en la ruta `/api/pedidos/:id`. | Validación del propietario (`req.user.sub`) en las consultas de pedidos. | Corregido |
| Roles ocultos en el frontend | A01 - Control de acceso roto | Acceso a endpoints administrativos sin verificar el rol en el backend. | Creación del middleware `requireRole('admin')` en las rutas protegidas. | Corregido |
| CORS abierto a cualquier origen | A02 - Configuración insegura | Revisión de la configuración inicial de CORS (`origin: "*"`). | Restricción estricta de CORS al origen del frontend (`https://localhost:3443`). | Corregido |
| Vulnerabilidad XSS almacenado | A05 - Inyección | Inyección de etiquetas `<script>` o atributos `onerror` en campos de texto libre. | Sanitización de entradas y uso de interpolación segura en el frontend junto con CSP de Helmet. | Corregido |
| Falta de protección CSRF | A08 - Integridad de software o datos | Simulación de envío de formularios externos hacia rutas de la API. | Implementación de doble envío de cookies con tokens anti-CSRF y cabecera `X-CSRF-Token`. | Corregido |