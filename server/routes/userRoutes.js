import express from 'express';
import {
  getUsers,
  updateUserRole,
  deleteUser,
} from '../controllers/userController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/').get(protect, getUsers);
router.route('/:id').delete(protect, deleteUser);
router.route('/:id/role').put(protect, updateUserRole);

export default router;
