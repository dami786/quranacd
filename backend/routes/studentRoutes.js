import express from 'express';
import { createStudent, getStudents, deleteStudent } from '../controllers/studentController.js';
import { protect, adminOrSuperAdmin } from '../middleware/authMiddleware.js';

const router = express.Router();

// Students: sirf admin / superadmin manage kar sakta
router.post('/', protect, adminOrSuperAdmin, createStudent);
router.get('/', protect, adminOrSuperAdmin, getStudents);
router.delete('/:id', protect, adminOrSuperAdmin, deleteStudent);

export default router;

