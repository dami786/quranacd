import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import Trial from '../models/Trial.js';
import PasswordReset from '../models/PasswordReset.js';
import nodemailer from 'nodemailer';

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
    const role = user.role || 'user';
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token,
      isSuperAdmin: !!isSuperAdmin,
      role,
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
    const role = user.role || 'user';
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token,
      isSuperAdmin: !!isSuperAdmin,
      role,
    });
  } catch (error) {
    res.status(500).json({ message: error.message || 'Server error.' });
  }
};

export const getProfile = async (req, res) => {
  try {
    const user = req.user;
    const isSuperAdmin = process.env.SUPER_ADMIN_EMAIL && user.email === process.env.SUPER_ADMIN_EMAIL;
    const role = user.role || 'user';
    const trial = await Trial.findOne({ email: (user.email || '').toLowerCase() }).lean();
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isSuperAdmin: !!isSuperAdmin,
      role,
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

const CODE_EXPIRY_MINUTES = 15;

function generateCode() {
  return String(Math.floor(100000 + Math.random() * 900000));
}

async function sendResetEmail(to, code) {
  const user = (process.env.EMAIL_USER || '').trim();
  const pass = (process.env.EMAIL_PASS || '').trim();
  if (!user || !pass) {
    console.log('[Password reset] Email not configured. Use this code for', to, ':', code);
    return;
  }
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user,
      pass,
    },
  });
  const mailOptions = {
    from: `"Babul Quran" <${user}>`,
    to,
    subject: 'Your password reset code - Babul Quran',
    text: `Your verification code is: ${code}\n\nThis code expires in ${CODE_EXPIRY_MINUTES} minutes. If you did not request this, please ignore this email.`,
    html: `<p>Your verification code is: <strong>${code}</strong></p><p>This code expires in ${CODE_EXPIRY_MINUTES} minutes.</p><p>If you did not request this, please ignore this email.</p>`,
  };
  try {
    await transporter.sendMail(mailOptions);
    console.log('[Password reset] Email sent to', to);
  } catch (err) {
    console.error('[Password reset] Send failed:', err.message);
    throw err;
  }
}

/** POST /auth/forgot-password - body: { email } - sends verification code to email */
export const requestPasswordReset = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ message: 'Please provide your email.' });
    }
    const emailLower = String(email).trim().toLowerCase();
    const user = await User.findOne({ email: emailLower });
    // Always respond same message so we don't reveal if email exists
    const code = generateCode();
    const expiresAt = new Date(Date.now() + CODE_EXPIRY_MINUTES * 60 * 1000);
    await PasswordReset.deleteMany({ email: emailLower });
    await PasswordReset.create({ email: emailLower, code, expiresAt });
    if (user) {
      await sendResetEmail(user.email, code);
    }
    res.json({ message: 'If an account exists with this email, a verification code has been sent.' });
  } catch (error) {
    res.status(500).json({ message: error.message || 'Server error.' });
  }
};

/** POST /auth/reset-password - body: { email, code, newPassword } */
export const resetPasswordWithCode = async (req, res) => {
  try {
    const { email, code, newPassword } = req.body;
    if (!email || !code || !newPassword) {
      return res.status(400).json({ message: 'Please provide email, verification code and new password.' });
    }
    if (String(newPassword).length < 6) {
      return res.status(400).json({ message: 'Password must be at least 6 characters.' });
    }
    const emailLower = String(email).trim().toLowerCase();
    const record = await PasswordReset.findOne({ email: emailLower, code: String(code).trim() });
    if (!record) {
      return res.status(400).json({ message: 'Invalid or expired verification code.' });
    }
    if (new Date() > record.expiresAt) {
      await PasswordReset.deleteOne({ _id: record._id });
      return res.status(400).json({ message: 'Verification code has expired. Please request a new one.' });
    }
    const user = await User.findOne({ email: emailLower }).select('+password');
    if (!user) {
      return res.status(400).json({ message: 'Invalid or expired verification code.' });
    }
    user.password = newPassword;
    await user.save();
    await PasswordReset.deleteOne({ _id: record._id });
    res.json({ message: 'Password has been reset. You can now login with your new password.' });
  } catch (error) {
    res.status(500).json({ message: error.message || 'Server error.' });
  }
};

/** GET /auth/users – list all users (superAdmin only). Returns name, email, role, _id */
export const getUsers = async (req, res) => {
  try {
    const users = await User.find({}).select('name email role _id').sort({ createdAt: -1 }).lean();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message || 'Server error.' });
  }
};

/** PATCH /auth/users/:id/role – update user role (superAdmin only). Body: { role: 'user' | 'admin' } */
export const updateUserRole = async (req, res) => {
  try {
    const { id } = req.params;
    const { role } = req.body;
    if (!role || !['user', 'admin'].includes(role)) {
      return res.status(400).json({ message: 'Invalid role. Use "user" or "admin".' });
    }
    const user = await User.findByIdAndUpdate(id, { role }, { new: true }).select('name email role _id');
    if (!user) return res.status(404).json({ message: 'User not found.' });
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message || 'Server error.' });
  }
};
