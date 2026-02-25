import express from 'express';
import { createStudent, getStudents } from '../controllers/studentController.js';
import { protect, adminOrSuperAdmin } from '../middleware/authMiddleware.js';

const router = express.Router();

// Students: sirf admin / superadmin manage kar sakta
router.post('/', protect, adminOrSuperAdmin, createStudent);
router.get('/', protect, adminOrSuperAdmin, getStudents);

export default router;

