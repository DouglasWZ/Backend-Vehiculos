const { Schema, model } = require('mongoose');

const VehiculoSchema = Schema({
    marca: {
        type: String,
        required: [true, 'La marca es obligatoria'],
        trim: true // para eliminar los espacios en blanco tanto al inicio, como al final
    },
    modelo: {
        type: String,
        required: [true, 'El modelo es obligatorio'],
        trim: true
    },
    placa: {
        type: String,
        required: [true, 'La placa es obligatoria'],
        trim: true
    }
});

module.exports = model('Vehiculo', VehiculoSchema);