const express = require('express');
const router = express.Router();
const userController = require('../Controllers/userController');

// Rutas
router.get('/users', userController.getAllUsers); // Obtener todos los usuarios
router.get('/users/:id', userController.getUserById); // Obtener usuario por ID
router.post('/users', userController.createUser); // Crear un usuario (con Facturapi)
router.delete('/users/facturapi/:facturapiId', userController.deleteUserByFacturapiId); // Eliminar usuario (de MongoDB y Facturapi)

module.exports = router;
