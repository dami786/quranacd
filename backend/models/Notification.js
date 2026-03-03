import mongoose from 'mongoose';

const notificationSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      enum: ['trial', 'query', 'donation', 'other'],
      required: true,
    },
    refId: {
      type: mongoose.Schema.Types.ObjectId,
      required: false,
    },
    title: { type: String, required: true, trim: true },
    message: { type: String, required: true, trim: true },
    source: { type: String, default: '', trim: true }, // e.g. free_trial, enrollment, register_now, packages, donation type
    isRead: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const Notification = mongoose.model('Notification', notificationSchema);
export default Notification;

