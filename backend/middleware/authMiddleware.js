import jwt from 'jsonwebtoken';
import User from '../models/User.js';

export const protect = async (req, res, next) => {
  let token;
  if (req.headers.authorization?.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }
  if (!token) {
    return res.status(401).json({ message: 'Not authorized. No token.' });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'quranacd-secret-change-in-production');
    req.user = await User.findById(decoded.id).select('-password');
    if (!req.user) {
      return res.status(401).json({ message: 'User not found.' });
    }
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Not authorized. Invalid token.' });
  }
};

export const superAdminOnly = (req, res, next) => {
  const isSuperAdmin = process.env.SUPER_ADMIN_EMAIL && req.user?.email === process.env.SUPER_ADMIN_EMAIL;
  if (!isSuperAdmin) {
    return res.status(403).json({ message: 'Forbidden. Superadmin only.' });
  }
  next();
};
