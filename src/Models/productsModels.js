const mongoose = require('mongoose');

const { categories } = require('../utils/enums');

const imageSchema = new mongoose.Schema({
    url: {
        type: String,
        required: true
    },
    alt: {
        type: String,
        required: true
    }
});

const productSchema = new mongoose.Schema({
    // Nombre del producto
    name: {
        type: String,
        required: true
    },
    // Descripción del producto
    description: {
        type: String,
        required: true
    },
    // Marca del producto
    brand: {
        type: String,
        required: true
    },
    // Precio del producto
    price: {
        type: Number,
        required: true
    },
    // Stock del producto
    stock: {
        type: Number,
        required: true,
        default: 0
    },
    // Categoría del producto
    category: {
        type: String,
        enum: Object.values(categories),
        default: categories.NO_CATEGORY
    },
    // Imagenes del producto
    imgs: {
        type: [imageSchema],
        required: true
    },
    // Fecha de creación del producto
    createdAt: {
        type: Date,
        default: Date.now
    },
    // Codigo de producto de Facturapi
    product_key: {
        type: String,
        required: false
    }
});

module.exports = mongoose.model('Product', productSchema);