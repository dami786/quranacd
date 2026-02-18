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
app.use(cors({ origin: true, credentials: true }));
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
