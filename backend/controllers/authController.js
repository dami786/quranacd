import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import Trial from '../models/Trial.js';

const generateToken = (id) => {
  return jwt.sign(
    { id },
    process.env.JWT_SECRET || 'quranacd-secret-change-in-production',
    { expiresIn: '30d' }
  );
};

export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Please provide name, email and password.' });
    }
    const emailLower = String(email).trim().toLowerCase();
    const exists = await User.findOne({ email: emailLower });
    if (exists) {
      return res.status(400).json({ message: 'User already exists with this email.' });
    }
    const user = await User.create({ name, email: emailLower, password });
    const token = generateToken(user._id);
    const isSuperAdmin = process.env.SUPER_ADMIN_EMAIL && user.email === process.env.SUPER_ADMIN_EMAIL;
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token,
      isSuperAdmin: !!isSuperAdmin,
    });
  } catch (error) {
    res.status(500).json({ message: error.message || 'Server error.' });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: 'Please provide email and password.' });
    }
    const emailLower = String(email).trim().toLowerCase();
    const user = await User.findOne({ email: emailLower }).select('+password');
    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password.' });
    }
    const match = await user.comparePassword(password);
    if (!match) {
      return res.status(401).json({ message: 'Invalid email or password.' });
    }
    const token = generateToken(user._id);
    const isSuperAdmin = process.env.SUPER_ADMIN_EMAIL && user.email === process.env.SUPER_ADMIN_EMAIL;
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token,
      isSuperAdmin: !!isSuperAdmin,
    });
  } catch (error) {
    res.status(500).json({ message: error.message || 'Server error.' });
  }
};

export const getProfile = async (req, res) => {
  try {
    const user = req.user;
    const isSuperAdmin = process.env.SUPER_ADMIN_EMAIL && user.email === process.env.SUPER_ADMIN_EMAIL;
    const trial = await Trial.findOne({ email: (user.email || '').toLowerCase() }).lean();
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isSuperAdmin: !!isSuperAdmin,
      enrollmentStatus: trial?.status || null,
      inquiry: trial ? {
        name: trial.name,
        course: trial.course || '',
        phone: trial.phone || '',
        message: trial.message || '',
        status: trial.status,
        createdAt: trial.createdAt,
      } : null,
    });
  } catch (error) {
    res.status(500).json({ message: error.message || 'Server error.' });
  }
};
