
class Sockets {
    constructor(io) {
        this.io = io;
        this.socketEvents();
    }

    socketEvents() {
        // On connection
        this.io.on('connection', (socket) => {
            // Emitir evento
            //socket.emit('mensaje-bienvenida', {
            //    msg: 'Bienvenido al Server',
            //    fecha: new Date(),
            //});

            // Escuchar evento
            socket.on('mensaje-cliente', (data) => {
                console.log(data);
                this.io.emit('mensaje-from-server', data);
            });

        });
    }
}

module.exports = Sockets;