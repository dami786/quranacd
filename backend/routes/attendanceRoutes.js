import express from 'express';
import { markAttendance, getMonthlySummary } from '../controllers/attendanceController.js';
import { protect, adminOrSuperAdmin } from '../middleware/authMiddleware.js';

const router = express.Router();

// Attendance mark karna + monthly summary dekhna – only admin/superadmin
router.post('/', protect, adminOrSuperAdmin, markAttendance);
router.get('/summary', protect, adminOrSuperAdmin, getMonthlySummary);

export default router;

