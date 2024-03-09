// Servidor de Express
const express = require( 'express' );
// Servidor de Sockets
const http = require( 'http' );
const socketIo = require( 'socket.io' );
const path = require( 'path' );
const Sockets = require( './sockets' );
const cors = require( 'cors' );
const { dbConnection } = require( '../database/config' );

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;
    // Conectar a DB
    dbConnection();
    // Http server
    this.server = http.createServer( this.app );
    // Configuracion del socket server
    this.io = socketIo( this.server ); // Configuraciones
  }

  middlewares() {
    // Desplegar el directorio publico
    this.app.use( express.static( path.resolve( __dirname, '../public' ) ) );
    // CORS
    this.app.use( cors() );
    // Parseo del Body
    this.app.use(express.json());
    // API ENDpoints
    this.app.use('/api/login', require('../router/auth'));
    this.app.use('/api/mensajes', require('../router/mensajes'));
  }

  configurarSockets() {
    new Sockets( this.io );
  }

  // Inicializar la aplicacion
  execute() {
    // Inicializar middlewares
    this.middlewares();
    // Inicializar Sockets
    this.configurarSockets();
    // Inicializar serves
    this.server.listen( this.port, () => {
      console.log( `Servidor corriendo en el puerto: ${ this.port }` );
    } );
  }

}


module.exports = Server;