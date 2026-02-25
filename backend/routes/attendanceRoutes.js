import express from 'express';
import {
  markAttendance,
  getMonthlySummary,
  getAttendanceByDate,
  getAttendanceRecords,
} from '../controllers/attendanceController.js';
import { protect, adminOrSuperAdmin } from '../middleware/authMiddleware.js';

const router = express.Router();

// Attendance mark karna – only admin/superadmin
router.post('/', protect, adminOrSuperAdmin, markAttendance);

// Ek date ki attendance (attendance leny wale page ke liye)
router.get('/', protect, adminOrSuperAdmin, getAttendanceByDate);
// Ek month ka sara record – har bachhe ka attendance table ke liye
router.get('/records', protect, adminOrSuperAdmin, getAttendanceRecords);
// Monthly summary (present/absent count & %)
router.get('/summary', protect, adminOrSuperAdmin, getMonthlySummary);

export default router;

