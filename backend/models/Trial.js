import mongoose from 'mongoose';

const trialSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, lowercase: true },
    phone: { type: String, default: '', trim: true },
    course: { type: String, default: '', trim: true },
    message: { type: String, default: '', trim: true },
    // Status: pending (new), approved (accepted), rejected, or free_trial (for free trial submissions)
    status: { type: String, enum: ['pending', 'approved', 'rejected', 'free_trial'], default: 'pending' },
    // source: kis button/flow se aaya (free_trial, enrollment, register_now, quick_admission, contact)
    source: {
      type: String,
      enum: ['free_trial', 'enrollment', 'register_now', 'quick_admission', 'contact'],
      default: 'free_trial',
    },
  },
  { timestamps: true }
);

const Trial = mongoose.model('Trial', trialSchema);
export default Trial;
