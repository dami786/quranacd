import express from 'express';
import {
  getItems,
  getItemById,
  createItem,
  updateItem,
  deleteItem,
  seedItems,
} from '../controllers/dataController.js';
import { protect, adminOrSuperAdmin } from '../middleware/authMiddleware.js';
import { upload } from '../middleware/uploadMiddleware.js';

const router = express.Router();

router.get('/', getItems);
router.get('/:id', getItemById);
router.post('/seed', protect, adminOrSuperAdmin, seedItems);
router.post('/', protect, adminOrSuperAdmin, upload.single('image'), createItem);
router.put('/:id', protect, adminOrSuperAdmin, upload.single('image'), updateItem);
router.delete('/:id', protect, adminOrSuperAdmin, deleteItem);

export default router;
