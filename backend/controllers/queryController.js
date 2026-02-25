import Query from '../models/Query.js';

export const submitQuery = async (req, res) => {
  try {
    const { name, email, message, phone, package: packageName, course } = req.body;
    if (!name || !email || !message) {
      return res.status(400).json({ message: 'Name, email and message are required.' });
    }
    const query = await Query.create({
      name: String(name).trim(),
      email: String(email).trim().toLowerCase(),
      message: String(message).trim(),
      phone: phone ? String(phone).trim() : '',
      package: packageName ? String(packageName).trim() : '',
      course: course ? String(course).trim() : '',
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

export const updateQueryStatus = async (req, res) => {
  try {
    const { status, reply } = req.body;
    const updates = {};
    if (status && ['pending', 'accepted', 'rejected'].includes(status)) updates.status = status;
    if (typeof reply === 'string') {
      updates.reply = reply.trim();
      updates.repliedAt = new Date();
    }
    if (Object.keys(updates).length === 0) {
      return res.status(400).json({ message: 'Provide status and/or reply.' });
    }
    const query = await Query.findByIdAndUpdate(req.params.id, updates, { new: true });
    if (!query) return res.status(404).json({ message: 'Query not found.' });
    res.json(query);
  } catch (error) {
    if (error.name === 'CastError') return res.status(404).json({ message: 'Query not found.' });
    res.status(500).json({ message: error.message || 'Failed to update query status.' });
  }
};

/** Public: get replies for an email (so user can see admin reply in chatbot) */
export const getRepliesByEmail = async (req, res) => {
  try {
    const email = (req.query.email || '').trim().toLowerCase();
    if (!email) return res.status(400).json({ message: 'Email is required.' });
    const list = await Query.find({ email, reply: { $exists: true, $ne: '' } })
      .sort({ repliedAt: -1 })
      .select('message reply repliedAt createdAt')
      .lean();
    res.json(list);
  } catch (error) {
    res.status(500).json({ message: error.message || 'Failed to fetch replies.' });
  }
};
