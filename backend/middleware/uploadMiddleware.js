import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../uploads'));
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname) || '.jpg';
    const name = `${Date.now()}-${Math.round(Math.random() * 1e9)}${ext}`;
    cb(null, name);
  },
});

const fileFilter = (req, file, cb) => {
  const allowed = /jpeg|jpg|png|gif|webp/i.test(file.mimetype);
  if (allowed) cb(null, true);
  else cb(new Error('Only images (jpeg, png, gif, webp) are allowed.'), false);
};

export const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 },
}); // 5MB

// Donation receipts: images + PDF
const receiptFileFilter = (req, file, cb) => {
  const allowed = /jpeg|jpg|png|gif|webp|pdf/i.test(file.mimetype);
  if (allowed) cb(null, true);
  else cb(new Error('Only images (jpeg, png, gif, webp) and PDF are allowed for receipts.'), false);
};

export const uploadReceipt = multer({
  storage,
  fileFilter: receiptFileFilter,
  limits: { fileSize: 5 * 1024 * 1024 },
});
