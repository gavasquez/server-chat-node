
const { Schema, model } = require( 'mongoose' );


const UsuarioScheme = Schema( {
  nombre: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
  },
  online: {
    type: Boolean,
    default: false,
  },
} );