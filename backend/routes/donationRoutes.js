import express from 'express';
import { submitDonation, getDonations } from '../controllers/donationController.js';
import { protect, adminOrSuperAdmin } from '../middleware/authMiddleware.js';
import { uploadReceipt } from '../middleware/uploadMiddleware.js';

const router = express.Router();

router.post('/', uploadReceipt.single('receipt'), submitDonation);
router.get('/', protect, adminOrSuperAdmin, getDonations);

export default router;
