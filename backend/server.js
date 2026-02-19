import 'dotenv/config';
import path from 'path';
import { fileURLToPath } from 'url';
import express from 'express';
import cors from 'cors';
import connectDB from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import dataRoutes from './routes/dataRoutes.js';
import trialRoutes from './routes/trialRoutes.js';
import donationRoutes from './routes/donationRoutes.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

connectDB();

const app = express();
// CORS: allow localhost (dev) + Vercel/production origins from env so cross-origin requests work
const allowedOrigins = [
  'http://localhost:3000',
  'http://localhost:5173',
  'http://127.0.0.1:3000',
  'http://127.0.0.1:5173',
  ...(process.env.CORS_ORIGIN ? process.env.CORS_ORIGIN.split(',').map((o) => o.trim()).filter(Boolean) : []),
];
app.use(cors({
  origin: (origin, cb) => {
    // Allow requests with no origin (e.g. Postman, same-origin)
    if (!origin) return cb(null, true);
    if (allowedOrigins.includes(origin)) return cb(null, true);
    // Allow any Vercel preview URL
    if (origin.endsWith('.vercel.app')) return cb(null, true);
    cb(null, false);
  },
  credentials: true,
}));
app.use(express.json());

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use('/api/auth', authRoutes);
app.use('/api/items', dataRoutes);
app.use('/api/trials', trialRoutes);
app.use('/api/donations', donationRoutes);

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
