const Product = require('../models/productModel')
const sydFunctions = require('../utils/syd-function')
const uploadFile = require('../middlewares/upload')

const getProduct = async (req, res) => {
    try {
        const data = await Product.find()
        res.status(200).json({ products: data })
    } catch (err) {
        res.status(400).json({
            message: err
        })
    }
}

const createProduct = async (req, res, next) => {
    // const errorMessage = sydFunctions.validators(req, res);
    // console.log('Retrieved errorMessage', errorMessage);
    // if (errorMessage) {
    //     return res.status(422).json({ message: 'Validation error', error: errorMessage });
    // }
    // if (!req.file) {
    //     return res.status(422).json({ message: 'Please add an image!' });
    // }
    // const { error } = productValidation(req.data)
    // if (error) return res.status(400).send(error.details[0].message)

    const createProduct = Product({
        name: req.body.name,
        description: req.body.description ?? null,
        price: req.body.price,
        stock: req.body.stock,
        updatedAt: null,
        createdBy: req.user._id,
        updatedBy: null
    })
    console.log('create', createProduct)

    //single
    // if(req.file) {
    //     createProduct.imageProduct = req.file.path
    // }

    //array uplload
    if (req.files) {
        let path = ''
        req.files.forEach((files, index, arr) => {
            path = path + files.path + ','
        });
        path = path.substring(0, path.lastIndexOf(","))
        createProduct.imageProduct = path
    }


    try {
        const req = await createProduct.save()
        res.status(200).send({ product: req })
    } catch (err) {
        res.status(400).send({
            status: 400,
            message: 'Bad Request'
        })
    }
}

module.exports = {
    getProduct,
    createProduct
}