const mongoose = require("mongoose")
let schema = mongoose.Schema
const uniqueValidator = require('mongoose-unique-validator');

let impresoraSchema = new schema({
    marca: {
        type: String,
        required: [true, 'La marca es requerida']
    },
    modelo: {
        type: String,
        required: [true, "El modelo es requerido"]
    },
    serie: {
        type: Number,
        required: [true, "El número de serie es requerido"]
    },
    color: {
        type: Boolean,
        default: false
    },
    ip: {
        type: String,
        required: [true, "La IP es requerida"]
    },
    contador: {
        type: Number,
        default: 0
    },
    precio: {
        type: Number,
        required: [true, "El precio es requerido"]
    }
})
impresoraSchema.plugin(uniqueValidator, { message: `{PATH} debe ser único` })
    /* impresoraSchema.methods.toJSON = function() {
        let impresora = this
        let impresoraobject = impresora.toObject()
        delete impresoraobject.contador
        return impresoraobject
    } */
module.exports = mongoose.model('impresora', impresoraSchema)