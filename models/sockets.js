
class Sockets {
    constructor(io) {
        this.io = io;
        this.socketEvents();
    }

    socketEvents() {
        // On connection
        this.io.on('connection', (socket) => {
           // TODO: Validar el jwt
           // Si el token no es valido, desconectarlo

           // TODO: Saber que usuario esta activo mediante el UID

           // TODO: Emitir todos los usuarios conectados

           // TODO: Socket join, uid

           // TODO: Escuchar cuando el cliente envia un mensaje
           //* mensaje-personal

           // TODO: Disconnect
           // Marcar en la bd que el usuario se desconecto

           // TODO: Emitir todos los usuarios conectados
        });
    }
}

module.exports = Sockets;