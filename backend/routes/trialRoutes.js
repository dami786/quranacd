import express from 'express';
import { submitTrial, getTrials, getMyTrial, updateTrialStatus, deleteTrial } from '../controllers/trialController.js';
import { protect, adminOrSuperAdmin } from '../middleware/authMiddleware.js';

const router = express.Router();

// Public: submit query / free trial
router.post('/', submitTrial);

// Logged-in user: get own inquiry (by email)
router.get('/me', protect, getMyTrial);

// Admin or Superadmin
router.get('/', protect, adminOrSuperAdmin, getTrials);
router.patch('/:id', protect, adminOrSuperAdmin, updateTrialStatus);
router.delete('/:id', protect, adminOrSuperAdmin, deleteTrial);

export default router;
