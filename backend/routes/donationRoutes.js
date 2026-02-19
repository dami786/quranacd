import express from 'express';
import { submitDonation, getDonations } from '../controllers/donationController.js';
import { protect, adminOrSuperAdmin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', submitDonation);
router.get('/', protect, adminOrSuperAdmin, getDonations);

export default router;
