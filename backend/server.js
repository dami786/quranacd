import 'dotenv/config';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import express from 'express';
import connectDB from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import dataRoutes from './routes/dataRoutes.js';
import trialRoutes from './routes/trialRoutes.js';
import donationRoutes from './routes/donationRoutes.js';
import queryRoutes from './routes/queryRoutes.js';
import studentRoutes from './routes/studentRoutes.js';
import attendanceRoutes from './routes/attendanceRoutes.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Donation receipt uploads – folder ensure karo taake multer fail na ho
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

const app = express();

// CORS: request ki origin wapas bhejo (credentials ke saath * nahi chalta)
app.use((req, res, next) => {
  const origin = req.headers.origin;
  if (origin) res.setHeader('Access-Control-Allow-Origin', origin);
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  if (req.method === 'OPTIONS') return res.sendStatus(204);
  next();
});
app.use(express.json());

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use('/api/auth', authRoutes);
app.use('/api/items', dataRoutes);
app.use('/api/trials', trialRoutes);
app.use('/api/donations', donationRoutes);
app.use('/api/queries', queryRoutes);
app.use('/api/students', studentRoutes);
app.use('/api/attendance', attendanceRoutes);

app.get('/', (req, res) => {
  res.send('API is running...');
});
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log('Server started on port', PORT);
  connectDB().catch((err) => {
    console.error('MongoDB connection error:', err.message);
    process.exit(1);
  });
});
