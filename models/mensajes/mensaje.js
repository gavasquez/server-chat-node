const { Schema, model } = require( 'mongoose' );


const MensajeSchema = Schema( {
  de: {
    type: Schema.Types.ObjectId,
    ref: 'Ususario',
    require: true
  },
  para: {
    type: Schema.Types.ObjectId,
    ref: 'Ususario',
    require: true
  },
  mensaje: {
    type: String,
    require: true,
  },
  image: {
    type: String,
    default: '',
  },
}, {
  timestamps: true
} );

MensajeSchema.method( 'toJSON', function () {
  const { __v, ...object } = this.toObject();
  return object;
} );

module.exports = model( 'Mensaje', MensajeSchema );