import express from 'express';
import { register, login, getProfile, requestPasswordReset, resetPasswordWithCode, getUsers, updateUserRole, changePassword } from '../controllers/authController.js';
import { protect, superAdminOnly } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/profile', protect, getProfile);
router.post('/forgot-password', requestPasswordReset);
router.post('/reset-password', resetPasswordWithCode);
router.post('/update-password', protect, changePassword);
router.get('/users', protect, superAdminOnly, getUsers);
router.patch('/users/:id/role', protect, superAdminOnly, updateUserRole);

export default router;
