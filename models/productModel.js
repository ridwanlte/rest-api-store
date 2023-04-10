const mongoose = require('mongoose')

const productSchema = mongoose.Schema({
    name: {
        type: String,
        min: 6,
        max: 255,
        required: true
    },
    description: {
        type: String,
        min: 6,
        max: 255
    },
    price: {
        type: String,
        min: 6,
        max: 255,
        required: true
    },
    stock: {
        type: Number,
        required: true
    },
    imageProduct: {
        type: String
    },
    createdAt: {
        type: Date,
        default: Date.now,
        required: true
    },
    updatedAt: {
        type: Date
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users'
    },
    updatedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users'
        
    }
})

module.exports = mongoose.model('Products', productSchema)