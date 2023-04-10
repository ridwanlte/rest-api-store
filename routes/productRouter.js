const router = require('express').Router()
const productController = require('../controllers/productController')
const authJWT = require('../middlewares/authJWT')
const upload = require('../middlewares/upload')


router.get('/', productController.getProduct)
// router.post('/', uploadImage, [authJWT.verifyToken, authJWT.isAdmin],productController.createProduct)
router.post('/', upload.array('imageProduct[]'), [authJWT.verifyToken, authJWT.isAdmin], productController.createProduct)

module.exports = router