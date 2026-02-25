import mongoose from 'mongoose';

// Student: roll number + name (plus optional contact info)
const studentSchema = new mongoose.Schema(
  {
    rollNo: {
      type: String,
      required: [true, 'Roll number is required'],
      trim: true,
      unique: true,
    },
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
    },
    email: { type: String, default: '', trim: true, lowercase: true },
    phone: { type: String, default: '', trim: true },
    note: { type: String, default: '', trim: true }, // e.g. parent name, timezone, etc.
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

const Student = mongoose.model('Student', studentSchema);
export default Student;

