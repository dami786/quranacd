import Trial from '../models/Trial.js';

export const submitTrial = async (req, res) => {
  try {
    const { name, email, phone, course, message, source } = req.body;
    if (!name || !email) {
      return res.status(400).json({ message: 'Name and email are required.' });
    }
    const emailLower = String(email).trim().toLowerCase();
    const existing = await Trial.findOne({ email: emailLower });
    if (existing) {
      return res.status(409).json({
        message: 'An inquiry has already been submitted with this email. We will contact you soon for your free trial.',
      });
    }
    const inquirySource = source === 'enrollment' ? 'enrollment' : 'free_trial';
    // Free trial wali inquiries ka status by default 'free_trial' rakho;
    // enrollment wali ko 'pending' hi rehne do (jab tak approve na karo).
    const initialStatus = inquirySource === 'enrollment' ? 'pending' : 'free_trial';
    const trial = await Trial.create({
      name: name.trim(),
      email: emailLower,
      phone: phone || '',
      course: course || '',
      message: message || '',
      source: inquirySource,
      status: initialStatus,
    });
    res.status(201).json(trial);
  } catch (error) {
    res.status(500).json({ message: error.message || 'Failed to submit inquiry.' });
  }
};

export const getTrials = async (req, res) => {
  try {
    const trials = await Trial.find().sort({ createdAt: -1 });
    res.json(trials);
  } catch (error) {
    res.status(500).json({ message: error.message || 'Failed to fetch inquiries.' });
  }
};

// Logged-in user's own inquiry (by email)
export const getMyTrial = async (req, res) => {
  try {
    const email = (req.user?.email || '').toLowerCase();
    if (!email) return res.status(400).json({ message: 'User email not found.' });
    const trial = await Trial.findOne({ email }).lean();
    if (!trial) return res.status(404).json({ message: 'No inquiry found for this account.' });
    res.json(trial);
  } catch (error) {
    res.status(500).json({ message: error.message || 'Failed to fetch inquiry.' });
  }
};

export const updateTrialStatus = async (req, res) => {
  try {
    const { status } = req.body;
    if (!['pending', 'free_trial', 'pro'].includes(status)) {
      return res.status(400).json({ message: 'Invalid status. Use pending, free_trial, or pro.' });
    }
    const trial = await Trial.findByIdAndUpdate(req.params.id, { status }, { new: true });
    if (!trial) return res.status(404).json({ message: 'Inquiry not found.' });
    res.json(trial);
  } catch (error) {
    if (error.name === 'CastError') return res.status(404).json({ message: 'Inquiry not found.' });
    res.status(500).json({ message: error.message || 'Failed to update.' });
  }
};

export const deleteTrial = async (req, res) => {
  try {
    const trial = await Trial.findByIdAndDelete(req.params.id);
    if (!trial) return res.status(404).json({ message: 'Inquiry not found.' });
    res.json({ message: 'Deleted.' });
  } catch (error) {
    if (error.name === 'CastError') return res.status(404).json({ message: 'Inquiry not found.' });
    res.status(500).json({ message: error.message || 'Failed to delete.' });
  }
};
