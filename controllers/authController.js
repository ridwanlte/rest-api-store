const User = require('../models/userModel')
const Role = require('../models/roleModel')
const bcrypt = require('bcryptjs')
const authValidation = require('../middlewares/authValidation')
const JWT = require('jsonwebtoken')

const register = async (req, res) => {
    const salt = await bcrypt.genSalt(10)
    const hashPassword = await bcrypt.hash(req.body.password, salt)

    const { error } = authValidation.registerValidation(req.body)
    if (error) return res.status(400).json({message: error.details[0].message})

    // const emailExist = await User.findOne({ email: req.body.email })
    // if (emailExist) return res.status(400).send('Email already exists!')

    const user = new User({
        displayName: req.body.displayName,
        email: req.body.email,
        password: hashPassword,
        phoneNumber: req.body.phoneNumber ?? '',
        updatedAt: ''
    })

    user.save((err, user) => {
        if (err) {
            res.status(500).json({ message: err })
            return
        }

        if (req.body.role) {
            console.log('req', req.body.role)
            Role.find({
                name: { $in: req.body.role }
            }, (err, role) => {
                console.log('arwr', role)
                if (err) {
                    res.status(500).json({ message: err})
                    return
                }
                user.role = role.map(role => role._id);
                user.save(err => {
                    if (err) {
                        res.status(500).json({ message: err});
                        return;
                    }
                    res.status(200).json({
                        'user': {
                            _id: user._id,
                            displayName: user.displayName,
                            email: user.email,
                            password: user.password,
                            phoneNumber: user.phoneNumber,
                            role: req.body.role,
                            createdAt: user.createdAt,
                            createdBy: user.createdBy,
                            updatedAt: user.updatedAt,
                            updatedBy: user.updatedBy,
                            __v: user.__v
                        }
                    })
                });
            })
        } else {
            Role.findOne({ name: "User" }, (err, role) => {
                if (err) {
                    res.status(500).json({ message: err });
                    return;
                }
                console.log(role._id)
                user.role = [role._id];

                user.save(err => {
                    if (err) {
                        res.status(500).json({ message: err });
                        return;
                    }
                    res.status(200).json({
                        'user': {
                            _id: user._id,
                            displayName: user.displayName,
                            email: user.email,
                            password: user.password,
                            phoneNumber: user.phoneNumber,
                            role: role.name,
                            createdAt: user.createdAt,
                            createdBy: user.createdBy,
                            updatedAt: user.updatedAt,
                            updatedBy: user.updatedBy,
                            __v: user.__v

                        }
                    })
                });
            });
        }
    })
}

const login = async (req, res) => {
    const { error } = authValidation.loginValidation(req.data)
    if (error) return res.status(400).send(error.details[0].message)

    const user = await User.findOne({ email: req.body.email }).populate('role', 'name')
    if (!user) return res.status(400).send('Invalid email!')

    const validPass = await bcrypt.compare(req.body.password, user.password)
    if (!validPass) return res.status(400).send('Invalid password!')

    const bearerToken = JWT.sign({ _id: user._id }, process.env.TOKEN_SECRET, { expiresIn: '1d' })
    
    res.status(200).header('Authorization', bearerToken).json({
        'user': {
            _id: user._id,
            displayName: user.displayName,
            email: user.email,
            password: user.password,
            phoneNumber: user.phoneNumber,
            role: user.role.name,
            createdAt: user.createdAt,
            createdBy: user.createdBy,
            updatedAt: user.updatedAt,
            updatedBy: user.updatedBy,
            __v: user.__v
        },
        token: bearerToken
    })
}

module.exports = {
    register,
    login
}