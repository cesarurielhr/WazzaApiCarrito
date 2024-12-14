const mongoose = require('mongoose');

const { roles } = require('../utils/enums');

const facturapiCustomerSchema = new mongoose.Schema({
    id: {
        type: String,
        require: false
    },
    legal_name: {
        type: String,
        required: true
    },
    tax_id: {
        type: String,
        required: true
    },
    tax_system: {
        type: String,
        default: '601'
    },
    address: {
        zip: { type: String, required: true},
        street: String,
        exterior: String,
        interior: String,
        neighborhood: String,
        city: String,
        municipality: String,
        state: String,
        country: String
    },
    email: String,
},
    { _id: false } // Para indicar que no es un subdocumento
)

const userSchema = new mongoose.Schema({
    // Nombre completo del usuario
    name: {
        type: String,
        required: true
    },
    // Correo electrónico del usuario (nombre de usuario para login)
    email: {
        type: String,
        required: true,
        unique: true
    },
    // Contraseña del usuario
    password: {
        type: String,
        required: true
    },
    // Rol del usuario
    role: {
        type: String,
        enum: Object.values(roles),
        default: 'CLIENT'
    },
    // Fecha de registro
    registeredAt: {
        type: Date,
        default: Date.now
    },
    // 
    facturapi_customer: {
        type: facturapiCustomerSchema
    }
});

const User = mongoose.model('User', userSchema);
module.exports = User;