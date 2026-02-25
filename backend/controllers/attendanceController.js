import mongoose from 'mongoose';
import Attendance from '../models/Attendance.js';
import Student from '../models/Student.js';

// Ek din ki attendance mark karo – body: { date, records: [{ studentId, status }] }
export const markAttendance = async (req, res) => {
  try {
    const { date, records } = req.body || {};
    if (!Array.isArray(records) || records.length === 0) {
      return res.status(400).json({ message: 'Attendance records array is required.' });
    }

    const baseDate = date ? new Date(date) : new Date();
    if (Number.isNaN(baseDate.getTime())) {
      return res.status(400).json({ message: 'Invalid date.' });
    }
    // Date ko day-only bana do (00:00:00)
    baseDate.setHours(0, 0, 0, 0);

    const updates = [];
    for (const rec of records) {
      const studentId = rec.studentId;
      const status = (rec.status || '').trim().toLowerCase();
      if (!studentId || !['present', 'absent'].includes(status)) continue;
      if (!mongoose.isValidObjectId(studentId)) continue;

      updates.push(
        Attendance.findOneAndUpdate(
          { student: studentId, date: baseDate },
          { student: studentId, date: baseDate, status },
          { upsert: true, new: true, setDefaultsOnInsert: true }
        )
      );
    }

    if (updates.length === 0) {
      return res.status(400).json({ message: 'No valid attendance records provided.' });
    }

    const result = await Promise.all(updates);
    res.status(201).json({ message: 'Attendance saved.', count: result.length });
  } catch (error) {
    res.status(500).json({ message: error.message || 'Failed to save attendance.' });
  }
};

// Har student ke liye ek month ka present/absent summary
// GET /api/attendance/summary?year=2025&month=1
export const getMonthlySummary = async (req, res) => {
  try {
    const year = Number(req.query.year) || new Date().getFullYear();
    const month = Number(req.query.month) || (new Date().getMonth() + 1); // 1-12
    if (month < 1 || month > 12) {
      return res.status(400).json({ message: 'Invalid month. Use 1-12.' });
    }

    const start = new Date(year, month - 1, 1);
    const end = new Date(year, month, 0);
    end.setHours(23, 59, 59, 999);

    const records = await Attendance.find({
      date: { $gte: start, $lte: end },
    })
      .populate('student', 'rollNo name')
      .lean();

    const byStudent = new Map();
    for (const rec of records) {
      if (!rec.student) continue;
      const key = String(rec.student._id);
      if (!byStudent.has(key)) {
        byStudent.set(key, {
          studentId: key,
          rollNo: rec.student.rollNo,
          name: rec.student.name,
          present: 0,
          absent: 0,
        });
      }
      const entry = byStudent.get(key);
      if (rec.status === 'present') entry.present += 1;
      if (rec.status === 'absent') entry.absent += 1;
    }

    const summary = [];
    for (const value of byStudent.values()) {
      const totalDays = value.present + value.absent;
      const presentPercentage = totalDays > 0 ? Number(((value.present / totalDays) * 100).toFixed(2)) : 0;
      const absentPercentage = totalDays > 0 ? Number(((value.absent / totalDays) * 100).toFixed(2)) : 0;
      summary.push({
        ...value,
        totalDays,
        presentPercentage,
        absentPercentage,
      });
    }

    // Jis student ki is mahine koi attendance nahi, wo summary mein nahi aayega
    res.json({
      year,
      month,
      summary,
    });
  } catch (error) {
    res.status(500).json({ message: error.message || 'Failed to fetch attendance summary.' });
  }
};

