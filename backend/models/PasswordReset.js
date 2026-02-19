import mongoose from 'mongoose';

const passwordResetSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },
    code: {
      type: String,
      required: true,
    },
    expiresAt: {
      type: Date,
      required: true,
    },
  },
  { timestamps: true }
);

// Remove expired documents periodically; also index for quick lookup
passwordResetSchema.index({ email: 1 });
passwordResetSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 }); // TTL - auto delete when expired

const PasswordReset = mongoose.model('PasswordReset', passwordResetSchema);
export default PasswordReset;
