import express from 'express';
import { submitQuery, getQueries } from '../controllers/queryController.js';
import { protect, adminOrSuperAdmin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', submitQuery);
router.get('/', protect, adminOrSuperAdmin, getQueries);

export default router;
