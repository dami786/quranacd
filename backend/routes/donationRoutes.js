import express from 'express';
import { submitDonation, getDonations, deleteDonation } from '../controllers/donationController.js';
import { protect, adminOrSuperAdmin } from '../middleware/authMiddleware.js';
import { uploadReceipt } from '../middleware/uploadMiddleware.js';

const router = express.Router();

router.post('/', uploadReceipt.single('receipt'), submitDonation);
router.get('/', protect, adminOrSuperAdmin, getDonations);
router.delete('/:id', protect, adminOrSuperAdmin, deleteDonation);

export default router;
