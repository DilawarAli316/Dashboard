import asyncHandler from 'express-async-handler'
import User from '../models/User.js'
import generateToken from '../utils/generateToken.js'
import bcrypt from 'bcryptjs'
import dotenv from 'dotenv'

dotenv.config()

// @desc Register a new user as guest
// @route POST /api/users
// @access Public

const registerUser = asyncHandler(async (req, res) => {
  const {
    name,
    phoneNumber,
    email,
    password,
    address,
    image,
    dob,
    gender,
    playerId,
  } = req.body

  console.log(req.body)

  const user = await User.create({
    // user.save() create a new user
    name,
    phoneNumber,
    email,
    password,
    image,
    dob,
    gender,
    playerId,
  })

  res.json(user)
})

const getUsers = asyncHandler(async (req, res) => {
  const pageSize = 10
  const page = req.query.pageNumber || 1

  const count = await User.countDocuments({})

  const users = await User.find({}) // find all the users
    .limit(pageSize)
    .skip(pageSize * (page - 1))

  if (users.length !== 0) {
    res.json({ users, page, pages: Math.ceil(count / pageSize) })
  } else {
    res.json([])
  }
})

// @desc get all users
// @route GET /api/users/all
// @access Private/Admin

const getUsersByApp = asyncHandler(async (req, res) => {
  const users = await User.find()

  // console.log(users.length)

  if (users.length !== 0) {
    res.json(users)
  } else {
    res.json([])
  }
})

// @desc Get users by id
// @route GET /api/users/:id
// @access Private/Admin

const getUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id, '-password') // alternate of .select('-password')

  console.log(user)

  if (user) {
    res.json(user)
  } else {
    res.json({})
  }
})

// @desc Update users by id
// @route PUT /api/users/:id
// @access Private/Admin

const updateUserbyId = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id)

  if (user) {
    user.name = req.body.name || user.name
    user.email = req.body.email || user.email
    user.phoneNumber = req.body.phoneNumber || user.phoneNumber
    user.image = req.body.image || user.image
    user.dob = req.body.dob || user.dob
    user.gender = req.body.gender || user.gender
    user.role = req.body.role || user.role

    const updatedUser = await user.save()

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      phoneNumber: updatedUser.phoneNumber,
      image: updatedUser.image,
      dob: updatedUser.dob,
      gender: updatedUser.gender,
      role: updatedUser.role,
      isAdmin: updatedUser.isAdmin,
    })
  } else {
    res.status(404)
    throw new Error('User not found')
  }
})

// @desc Delete users by id
// @route DELETE /api/users/:id
// @access Private/Admin

const deleteUserById = asyncHandler(async (req, res) => {
  const user = await User.findByIdAndRemove(req.params.id)

  if (user) {
    // user.remove()
    res.json({ message: 'User Removed' })
  } else {
    res.status(404)
    throw new Error('User not found')
  }
})

// @desc Login a user
// @route POST /api/users/login
// @access Public

const loginUser = asyncHandler(async (req, res) => {
  const { email, password, playerId } = req.body
  const user = await User.findOne({ email })

  if (user && (await user.matchPassword(password))) {
    const updPlayerId = await User.updateOne({ _id: user._id }, { playerId })

    if (updPlayerId) {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        phoneNumber: user.phoneNumber,
        password: user.password,
        image: user.image,
        dob: user.dob,
        gender: user.gender,
        isAdmin: user.isAdmin,
        playerId: playerId,
        token: generateToken(user._id),
      })
    }
  } else {
    res.status(404)
    throw new Error('Invalid email and password')
  }
})

// @desc Get user profile
// @route GET /api/users/profile
// @access Private

const getUserProfile = asyncHandler(async (req, res) => {
  // console.log(req.user._id)
  const user = await User.findById(req.user._id) // find user from it's id generated from token (authMiddlewares)

  if (user) {
    // if user is found then give its info
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      phoneNumber: user.phoneNumber,
      password: user.password,
      image: user.image,
      dob: user.dob,
      gender: user.gender,
      role: user.role,
      isAdmin: user.isAdmin,
      playerId: user.playerId,
    })
  } else {
    res.status(404)
    throw new Error('User not found')
  }
})

// @desc Update user profile
// @route PUT /api/users/profile
// @access Private

const updateUserProfile = asyncHandler(async (req, res) => {
  // const { updatedData } = req.body

  console.log(req.body)

  const key = Object.keys(req.body)

  console.log(key)

  if (key.includes('password')) {
    const salt = await bcrypt.genSalt(10)
    req.body.password = await bcrypt.hash(req.body.password, salt)

    console.log(req.body)

    const user = await User.findOneAndUpdate({ _id: req.user._id }, req.body, {
      new: true,
    })
    res.json(user)
  } else {
    const user = await User.findOneAndUpdate({ _id: req.user._id }, req.body, {
      new: true,
    })
    res.json(user)
  }
})

export {
  registerUser,
  loginUser,
  getUserProfile,
  updateUserProfile,
  getUserById,
  updateUserbyId,
  deleteUserById,
  getUsersByApp,
  getUsers,
}
