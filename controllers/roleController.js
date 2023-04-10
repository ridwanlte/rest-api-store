const Role = require('../models/roleModel')

const getAllRoles = async (req, res, next) => {
    const roles = await Role.find()
    if (!roles) return res.status(204).json({ message: 'No roles found' })
    res.status(200).json({
        'data': {
            'roles': roles
        }
    })
}

module.exports = {
    getAllRoles,
}