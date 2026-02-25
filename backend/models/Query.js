import mongoose from 'mongoose';

const querySchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, lowercase: true },
    phone: { type: String, default: '', trim: true },
    message: { type: String, required: true, trim: true },
    package: { type: String, default: '', trim: true }, // e.g. Basic, Standard, Plus – packages section se aata hai
    course: { type: String, default: '', trim: true }, // user ne Contact form se jo course select kiya
    status: { type: String, enum: ['pending', 'accepted', 'rejected'], default: 'pending' },
    reply: { type: String, default: '', trim: true },
    repliedAt: { type: Date, default: null },
  },
  { timestamps: true }
);

const Query = mongoose.model('Query', querySchema);
export default Query;
