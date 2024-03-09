const { Schema, model } = require('mongoose');


const MensajeSchema = Schema({
    sala: {
        type: String,
        require: true,
    },
    imagen: {
        type: String,
    },
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
    }
}, {
    timestamps: true
});

MensajeSchema.method('toJSON', function () {
    const { __v, ...object } = this.toObject();
    return object;
});

module.exports = model('Mensaje', MensajeSchema);