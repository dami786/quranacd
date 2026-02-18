import express from 'express';
import { submitTrial, getTrials, getMyTrial, updateTrialStatus, deleteTrial } from '../controllers/trialController.js';
import { protect, superAdminOnly } from '../middleware/authMiddleware.js';

const router = express.Router();

// Public: submit query / free trial
router.post('/', submitTrial);

// Logged-in user: get own inquiry (by email)
router.get('/me', protect, getMyTrial);

// Superadmin only
router.get('/', protect, superAdminOnly, getTrials);
router.patch('/:id', protect, superAdminOnly, updateTrialStatus);
router.delete('/:id', protect, superAdminOnly, deleteTrial);

export default router;
