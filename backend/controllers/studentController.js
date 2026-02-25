import Student from '../models/Student.js';

// Student add karo (roll number + name)
export const createStudent = async (req, res) => {
  try {
    const rollNo = (req.body.rollNo || '').trim();
    const name = (req.body.name || '').trim();
    if (!rollNo || !name) {
      return res.status(400).json({ message: 'Roll number and name are required.' });
    }
    try {
      const student = await Student.create({ rollNo, name });
      res.status(201).json(student);
    } catch (err) {
      if (err.code === 11000) {
        return res.status(409).json({ message: 'A student with this roll number already exists.' });
      }
      throw err;
    }
  } catch (error) {
    res.status(500).json({ message: error.message || 'Failed to create student.' });
  }
};

// Saare students list karo (dashboard / attendance mapping ke liye)
export const getStudents = async (req, res) => {
  try {
    const students = await Student.find().sort({ rollNo: 1, name: 1 }).lean();
    res.json(students);
  } catch (error) {
    res.status(500).json({ message: error.message || 'Failed to fetch students.' });
  }
};

