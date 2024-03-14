const { usuarioConectado, usuarioDesconectado, grabarMensaje } = require( "../controllers/sockets" );
const { getUsuarios } = require( '../controllers/usuarios' );
const { comprobarJWT } = require( "../helpers/jwt" );

class Sockets {
  constructor( io ) {
    this.io = io;
    this.socketEvents();
  }

  socketEvents() {
    // On connection
    this.io.on( 'connection', async ( socket ) => {
      // Identificar persona conectada
      // TODO: Validar el jwt
      const [ valido, uid ] = comprobarJWT( socket.handshake.query[ 'x-token' ] );
      // Si el token no es valido, desconectarlo
      if ( !valido ) {
        return socket.disconnect();
      }
      // TODO: Saber que usuario esta activo mediante el UID
      await usuarioConectado( uid );
      // TODO: Emitir todos los usuarios conectados
      this.io.emit( 'lista-usuarios', await getUsuarios() );
      // TODO: Socket join, uid
      client.join( uid );
      // TODO: Escuchar cuando el cliente envia un mensaje
      //* mensaje-personal
      client.on( 'mensaje-personal', async ( payload ) => {
        //! Grabar mensaje
        await grabarMensaje( payload );
        io.to( payload.para ).emit( 'mensaje-personal', payload );
      } );
      // TODO: Disconnect
      // Marcar en la bd que el usuario se desconecto
      socket.on( 'disconnect', async () => {
        usuarioDesconectado( uid );
        //TODO: Cuando se desconecta un usuario enviamos nuevamente la lista de los usuarios conectados
        this.io.emit( 'lista-usuarios', await getUsuarios() );
      } );
    } );
  }
}

module.exports = Sockets;