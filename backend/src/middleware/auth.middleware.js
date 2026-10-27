const jwt = require('jsonwebtoken');

function verificarToken(req, res, next) {
    // Tomamos el token de la cookie HttpOnly configurada en el login
    const token = req.cookies.token;

    if (!token) {
        return res.status(401).json({ error: 'No autenticado, falta token' });
    }

    try {
        // Verificamos el token usando el secreto del entorno
        const cifrado = jwt.verify(token, process.env.JWT_SECRET);
        req.user = cifrado; // Inyecta los datos del usuario (sub, rol, etc.) en la petición
        next();
    } catch (error) {
        return res.status(401).json({ error: 'Token inválido o expirado' });
    }
}

module.exports = verificarToken;