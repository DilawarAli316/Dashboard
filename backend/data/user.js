import bcrypt from 'bcryptjs'

const user = [
  {
    name: 'Admin',
    email: 'admin@example.com',
    password: bcrypt.hashSync('12145', 10),
    isAdmin: true,
  },
  {
    name: 'Drew',
    email: 'drew@example.com',
    password: bcrypt.hashSync('12145', 10),
  },
  {
    name: 'Brawn',
    email: 'brawn@example.com',
    password: bcrypt.hashSync('12145', 10),
  },
]

export default user
