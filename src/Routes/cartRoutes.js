const express = require('express');
const shoppingCartController = require('../Controllers/shoppingCartController');

const router = express.Router();

router.get('/byUser/:userId', shoppingCartController.getShoppingCartById);
router.get('/byId/:cartId', shoppingCartController.getShoppingCartById);
router.post('/create/', shoppingCartController.createShoppingCart);
router.post('/addItem/:cartId', shoppingCartController.addItemToCart);
router.post('/removeItem/:cartId', shoppingCartController.removeItemFromCart);
router.post('/updateItem/:cartId', shoppingCartController.updateItemQuantity);
router.post('/close/:cartId', shoppingCartController.closeShoppingCart);


module.exports = router;
