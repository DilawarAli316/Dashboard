import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'

const addressSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
  address: {
    type: String,
    required: true,
  },
  defaultAddress: {
    type: Boolean,
    default: false,
  },
})

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    confirmPassword: {
      type: String,
      // required: true,
    },

    gender: {
      type: String,
    },

    role: {
      type: String,
    },
    isAdmin: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
)

userSchema.methods.matchPassword = async function (enteredpassword) {
  // for login
  return await bcrypt.compare(enteredpassword, this.password) //this.password current user password
}

userSchema.pre('save', async function (next) {
  // for registering
  if (!this.isModified('password')) {
    next()
  }
  const salt = await bcrypt.genSalt(10)
  this.password = await bcrypt.hash(this.password, salt)
})

const User = mongoose.model('User', userSchema)

export default User
