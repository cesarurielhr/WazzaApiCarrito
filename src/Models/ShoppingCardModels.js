const mongoose = require('mongoose');
const { orderStatus, paymentStatus } = require('../utils/enums');

const cartSchema = new mongoose.Schema({
    // Referencia al usuario por ID
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    // Items de la compra
    items: [{
        // Referencia al producto por ID
        product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product',
            required: true
        },
        // Precio del producto
        price: {
            type: Number,
            required: true
        },
        // Cantidad de este producto
        quantity: {
            type: Number,
            required: true,
            default: 1
        },
        // Precio total (precio * cantidad)
        totalPrice: {
            type: Number,
            required: true
        }
    }],
    // Porcentaje de impuestos
    tax: {
        type: Number,
        default: 0.16 // 16% de IVA por defecto
    },
    // Total antes de impuestos
    subTotal: {
        type: Number,
        required: true,
        default: 0
    },
    // Total con impuestos
    total: {
        type: Number,
        required: true,
        default: 0
    },
    // Fecha de creación
    createdAt: {
        type: Date,
        default: Date.now
    },
    // Fecha de cierre
    closedAt: {
        type: Date,
        default: null
    },
    // Estado activo
    isActive: {
        type: Boolean,
        default: true
    },
    // Tipo de pago
    paymentMethod: {
        type: String,
        default: 'DEBIT'
    },
    // Estado del carrito
    status: {
        type: String,
        enum: Object.values(orderStatus),
        default: orderStatus.PENDING
    },
    // Informacion adicional
    aditionalInfo: {
        type: String,
        required: false
    }
});

module.exports = mongoose.model('ShoppingCart', cartSchema);