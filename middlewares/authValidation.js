const Joi = require('joi')

const registerValidation = (data) => {
    const schema = Joi.object({
        displayName: Joi.string().min(5).required(),
        email: Joi.string().min(6).email().required(),
        password: Joi.string().min(6).required(),
        role: Joi.string()
    })
    return schema.validate(data)
}

const loginValidation = (data) => {
    const schema = Joi.object({
        email: Joi.string().email().min(6).required(),
        password: Joi.string().min(6).required()
    })
    return schema.validate(data)
}

module.exports = {
    registerValidation,
    loginValidation
}