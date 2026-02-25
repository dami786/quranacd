import mongoose from 'mongoose';

const attendanceSchema = new mongoose.Schema(
  {
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Student',
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    status: {
      type: String,
      enum: ['present', 'absent'],
      required: true,
    },
  },
  { timestamps: true }
);

// Har student ke liye har date par sirf 1 record (unique)
attendanceSchema.index({ student: 1, date: 1 }, { unique: true });

const Attendance = mongoose.model('Attendance', attendanceSchema);
export default Attendance;

