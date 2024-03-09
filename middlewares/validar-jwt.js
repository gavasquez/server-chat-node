const jwt = require('jsonwebtoken');
const response = require('express')

const validarJWT = (req, res = response, next) => {
    try {
        const token = req.header('x-token');
        if(!token){
            return res.status(401).json({
                ok: false,
                msg: 'No hay token en la peticion'
            });
        }
        const payload = jwt.verify(token, process.env.JWT_KEY);
        // Enviamos el uid a el controlador
        req.uid = payload.uid;
        next();
    } catch (error) {
        res.status(401).json({
            ok: false,
            msg: 'Token no es valido'
        });
    }
}

module.exports = {
    validarJWT,
}