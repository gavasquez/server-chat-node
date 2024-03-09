// Servidor de Express
const express = require('express');
// Servidor de Sockets
const http = require('http');
const socketIo = require('socket.io');
const path = require('path');
const Sockets = require('./sockets');

class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        // Http server
        this.server = http.createServer(this.app);
        // Configuracion del socket server
        this.io = socketIo(this.server); // Configuraciones
    }

    middlewares() {
        // Desplegar el directorio publico
        this.app.use(express.static(path.resolve(__dirname, '../public') ));
    }

    configurarSockets(){
       new Sockets(this.io);
    }

    // Inicializar la aplicacion
    execute() {
        // Inicializar middlewares
        this.middlewares();
        // Inicializar Sockets
        this.configurarSockets();
        // Inicializar serves
        this.server.listen(this.port, () => {
            console.log(`Servidor corriendo en el puerto: ${this.port}`);
        });
    }

}


module.exports = Server;