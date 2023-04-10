const User = require('../models/userModel')
const Role = require('../models/roleModel')

const checkDuplicateEmail = async (req, res, next) => {
    User.findOne({
        email: req.body.email
    }).exec((err, user) => {
        if (err) {
            res.status(500).send({ message: err });
            return;
        }

        if (user) {
            res.status(400).send({ message: "Failed! Email is already in use!" });
            return;
        }

        next();
    });
}

const checkRoleExisted = async (req, res, next) => {
    if (req.body.role) {
        for (let i = 0; i < req.body.role.length; i++) {
            console.log('role', req.body.role[i])
            if (!Role.includes(req.body.role[i])) {
                console.log(!Role.includes(req.body.role[i]))
                res.status(400).send({
                    message: `Failed! Role ${req.body.role[i]} does not exist!`
                });
                return;
            }
        }
    }
    next();
}

module.exports = {
    checkDuplicateEmail,
    checkRoleExisted
}