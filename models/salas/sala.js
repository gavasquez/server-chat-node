const { Schema, model } = require('mongoose');


const SalaSchema = Schema({
    nombre: {
        type: String,
        require: true,
    },
    descripcion: {
        type: String,
    },
}, {
    timestamps: true
});

SalaSchema.method('toJSON', function () {
    const { __v, ...object } = this.toObject();
    return object;
});

module.exports = model('Sala', SalaSchema);