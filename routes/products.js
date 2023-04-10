// const router = require('express').Router()
// const verify = require('../middlewares/verifyToken')
// // const verify = require('../routes/verifyToken')
// const Product = require('../models/productModel')
// const { productValidation } = require('../validations')
// const uploadImage = require('../middlewares/uploadImage')

// router.get('/', verify.verifyToken, async(req, res) => {
//     try{
//         const data = await Product.find()
//         res.status(200).json({products: data})
//     } catch (err) {
//         res.status(400).json({
//             message: err
//         })
//     }
// })

// router.post('/',  uploadImage, async (req, res) => {
//     const { error } = productValidation(req.data)
//     if (error) return res.status(400).send(error.details[0].message)

//     const createProduct = Product({
//         name: req.body.name,
//         description: req.body.description ?? null,
//         price: req.body.price,
//         stock: req.body.stock,
//         thumbnaile: req.file.thumbnaile.replace("\\", "/"),
//         updatedAt: null,
//         createdBy: req.user._id,
//         updatedBy: null
//     })

//     try {
//         const req = await createProduct.save()
//         res.status(200).send({ product: req })
//     } catch (err) {
//         res.status(400).send({
//             status: 400,
//             message: 'Bad Request'
//         })
//     }
// })

// router.delete('/:id', verify.verifyToken, async(req, res) => {
    
// })

// module.exports = router