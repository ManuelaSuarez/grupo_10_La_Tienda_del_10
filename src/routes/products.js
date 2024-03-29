const express = require('express');
const router = express.Router();

const productsController = require('../controllers/productsController');
const uploadProduct = require('../middlewares/multerProductMiddleware');
const validations = require('../middlewares/validateProductsMiddleware');
const authProduct = require('../middlewares/authProductMiddleware');
const productValidation = require('../public/js/productValidationMiddleware');

router.get('/', productsController.index)
router.get('/search', productsController.search)

router.get('/create', authProduct, productsController.create)
router.post('/create', uploadProduct.single('imagenProducto'),  productValidation.validateProduct,validations, productsController.store)

router.get('/detail/:id', productsController.detail)

router.get('/:id/edit', authProduct, productsController.edit)
router.put('/:id/edit', productsController.update)

router.delete('/:id/delete', productsController.destroy)

router.get('/productCart', productsController.cart)


module.exports = router;