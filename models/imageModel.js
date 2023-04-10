const mongoose = require('mongoose')

const imageSchema = mongoose.Schema({
    name: String,
    imageThumb: {
        data: Buffer,
        contentType: String
    }
})

module.exports = mongoose.model('tesimage', imageSchema)