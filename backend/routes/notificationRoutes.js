import express from 'express';
import {
  getNotifications,
  markNotificationRead,
  markAllNotificationsRead,
} from '../controllers/notificationController.js';
import { protect, adminOrSuperAdmin } from '../middleware/authMiddleware.js';

const router = express.Router();

// Admin notifications – list + mark read
router.get('/', protect, adminOrSuperAdmin, getNotifications);
router.patch('/mark-all-read', protect, adminOrSuperAdmin, markAllNotificationsRead);
router.patch('/:id/read', protect, adminOrSuperAdmin, markNotificationRead);

export default router;

