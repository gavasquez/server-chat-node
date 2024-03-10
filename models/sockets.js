const { usuarioConectado, usuarioDesconectado, getUsuarios } = require("../controllers/sockets");
const { comprobarJWT } = require("../helpers/jwt");

class Sockets {
    constructor(io) {
        this.io = io;
        this.socketEvents();
    }

    socketEvents() {
        // On connection
        this.io.on('connection', async (socket) => {
            // Identificar persona conectada
            // TODO: Validar el jwt
            const [valido, uid] = comprobarJWT(socket.handshake.query['x-token']);
            // Si el token no es valido, desconectarlo
            if (!valido) {
                console.log('Socket no indentificado');
                return socket.disconnect();
            }
            // TODO: Saber que usuario esta activo mediante el UID
            console.log('Cliente conectado', uid);
            await usuarioConectado(uid);

            // TODO: Emitir todos los usuarios conectados
            this.io.emit('lista-usuarios', await getUsuarios());
            // TODO: Socket join, uid

            // TODO: Escuchar cuando el cliente envia un mensaje
            //* mensaje-personal

            // TODO: Disconnect
            // Marcar en la bd que el usuario se desconecto
            socket.on('disconnect', async () => {
                console.log('Cliente desconectado', uid)
                usuarioDesconectado(uid);
                // Cuando se desconecta un usuario enviamos nuevamente la lista de los usuarios conectados
                this.io.emit('lista-usuarios', await getUsuarios());
            });

            // TODO: Emitir todos los usuarios conectados
        });
    }
}

module.exports = Sockets;