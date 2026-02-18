import express from 'express';
import { submitDonation, getDonations } from '../controllers/donationController.js';
import { protect, superAdminOnly } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', submitDonation);
router.get('/', protect, superAdminOnly, getDonations);

export default router;
