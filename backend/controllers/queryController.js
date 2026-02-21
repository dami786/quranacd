import Query from '../models/Query.js';

export const submitQuery = async (req, res) => {
  try {
    const { name, email, message, phone } = req.body;
    if (!name || !email || !message) {
      return res.status(400).json({ message: 'Name, email and message are required.' });
    }
    const query = await Query.create({
      name: name.trim(),
      email: String(email).trim().toLowerCase(),
      message: String(message).trim(),
      phone: phone ? String(phone).trim() : '',
    });
    res.status(201).json(query);
  } catch (error) {
    res.status(500).json({ message: error.message || 'Failed to submit query.' });
  }
};

export const getQueries = async (req, res) => {
  try {
    const queries = await Query.find().sort({ createdAt: -1 });
    res.json(queries);
  } catch (error) {
    res.status(500).json({ message: error.message || 'Failed to fetch queries.' });
  }
};
