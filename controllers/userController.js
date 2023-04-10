const User = require('../models/userModel')

const getAllUsers = async (req, res) => {
  const users = await User.find()
  if (!users) return res.status(403).json({ message: 'Forbidden' })
  res.status(200).json({
    data: {
      users
    }
  })
}

const getUser = async (req, res) => {
  if (!req?.params?.id) return res.status(400).json({ "message": 'User ID required' });
  const user = await User.findOne({ _id: req.params.id }).exec();
  if (!user) {
    return res.status(204).json({ 'message': `User ID ${req.params.id} not found` });
  }
  res.status(200).json({
    'data': {
      user
    },
  });
}

const deleteUser = async (req, res) => {
  if (!req?.body?.id) return res.status(400).json({ message: 'User ID required' })
  const user = await User.findOne({ _id: req.body.id }).exec()
  if (!user) { return res.status(204).json({ 'message': `User ID ${req.body.id} not found` }) }
  const result = await user.deleteOne()
  res.status(200).json({
    'message': 'Delete success',
    'data': {
      'user': result
    }
  })
}

const updateUser = async (req, res) => {
  const { displayName, email, phoneNumber } = req.body
  let _id  = req?.params?.id
  if (!_id) return res.status(400).json({ 'message': 'User ID required' })

  // const user = await User.findOne({ _id: _id}).exec()
  const user = new User({
    displayName: displayName,
    email: email,
    phoneNumber: phoneNumber
  })

  const result = await User.updateOne({_id: _id}, {$set: user})

  // const result = await User.updateOne(user).exec()
  res.status(200).json({
    'status': 200,
    'message': 'Update success',
    'data': {
      'user': result
    }
  })
}

module.exports = {
  getAllUsers,
  getUser,
  deleteUser,
  updateUser
}