import mongoose from 'mongoose';

const trialSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, lowercase: true },
    phone: { type: String, default: '', trim: true },
    course: { type: String, default: '', trim: true },
    message: { type: String, default: '', trim: true },
    status: { type: String, enum: ['pending', 'free_trial', 'pro'], default: 'pending' },
    source: { type: String, enum: ['free_trial', 'enrollment'], default: 'free_trial' },
  },
  { timestamps: true }
);

const Trial = mongoose.model('Trial', trialSchema);
export default Trial;
