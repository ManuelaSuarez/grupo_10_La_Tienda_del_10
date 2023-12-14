const express = require('express');
const router = express.Router();

const productsController = require('../controllers/productsController');
const uploadProduct = require('../middlewares/multerProductMiddleware');

router.get('/', productsController.index)

router.get('/create',productsController.create)
router.post('/create',productsController.store)
//router.post('/', uploadProduct.single('imagenProducto') ,productsController.store)

router.get('/:id', productsController.detail)

router.get('/:id/edit', productsController.edit)
router.put('/:id', productsController.update)

router.delete('/:id', productsController.destroy)

router.get('/productCart', productsController.cart)


module.exports = router;