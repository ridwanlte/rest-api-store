const Joi = require('joi')

const productValidation = (data) => {
    const schema = Joi.object({
        name: Joi.string().email().min(6).required(),
        price: Joi.string().min(6).required(),
        stock: Joi.string().required(),
    })
    return schema.validate(data)
}
module.exports.productValidation = productValidation