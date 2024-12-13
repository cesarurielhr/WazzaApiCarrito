const express = require('express');
const userController = require('../Controllers/userController');

const router = express.Router();

router.get('/', userController.getAllUsers);
router.get('/:id', userController.getUserById);
router.post('/', userController.createUser);
router.delete('/:id', userController.deleteUser);
router.post('/:id/facturapi-customer', userController.createFacturapiCustomer);


module.exports = router;
