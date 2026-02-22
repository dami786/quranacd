import express from 'express';
import { submitQuery, getQueries, updateQueryStatus, getRepliesByEmail } from '../controllers/queryController.js';
import { protect, adminOrSuperAdmin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', submitQuery);
router.get('/replies', getRepliesByEmail);
router.get('/', protect, adminOrSuperAdmin, getQueries);
router.patch('/:id', protect, adminOrSuperAdmin, updateQueryStatus);

export default router;
