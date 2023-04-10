const { required } = require('joi')
const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    displayName: {
        type: String,
        required: true,
        min: 6,
        max: 255
    },
    email: {
        type: String,
        required: true,
        min: 6,
        max: 255
    },
    password: {
        type: String,
        required: true,
        min: 6,
        max: 1024
    },
    phoneNumber: {
        type: String,
        min: 10,
        max: 15
    },
    role: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Role'
    },
    createdAt: {
        type: Date,
        default: Date.now,
        required: true
    },
    createdBy: {
        type: String
    },
    updatedAt: {
        type: Date
    },
    updatedBy: {
        type: String
    }
})

module.exports = mongoose.model('Users', userSchema)