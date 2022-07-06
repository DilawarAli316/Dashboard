import express from 'express'
const router = express.Router()
import {
  registerUser,
  loginUser,
  updateUserProfile,
  getUserProfile,
  getUserById,
  updateUserbyId,
  deleteUserById,
  getUsersByApp,
  getUsers,
} from '../controllers/userController.js'
import { admin, protect } from '../middlewares/authMiddlewares.js'

router.route('/').post(registerUser).get(getUsers)
router.route('/all').get(getUsersByApp)
router.post('/login', loginUser)
router.route('/profile').get(getUserProfile).put(updateUserProfile)

router.route('/:id').get(getUserById).put(updateUserbyId).delete(deleteUserById)

export default router
