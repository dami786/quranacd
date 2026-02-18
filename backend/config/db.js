import mongoose from 'mongoose';
import User from '../models/User.js';

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/quranacd');
    console.log(`MongoDB Connected: ${conn.connection.host}`);
    await createSuperAdminIfNeeded();
  } catch (error) {
    console.error('MongoDB connection error:', error.message);
    process.exit(1);
  }
};

async function createSuperAdminIfNeeded() {
  const email = process.env.SUPER_ADMIN_EMAIL;
  const password = process.env.SUPER_ADMIN_PASSWORD;
  if (!email || !password) return;
  const exists = await User.findOne({ email });
  if (exists) return;
  await User.create({ name: 'Super Admin', email, password });
  console.log('Super admin user created:', email);
}

export default connectDB;
