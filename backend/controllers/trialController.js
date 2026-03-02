import Trial from '../models/Trial.js';

export const submitTrial = async (req, res) => {
  try {
    const { name, email, phone, course, message, source } = req.body;
    if (!name || !email) {
      return res.status(400).json({ message: 'Name and email are required.' });
    }
    const emailLower = String(email).trim().toLowerCase();
    const courseValue = (course || '').trim();

    const rawSource = (source || '').trim();
    const isEnrollLike = ['enrollment', 'register_now', 'quick_admission'].includes(rawSource);

    // Allow multiple inquiries overall, but sirf enrollment-type ke liye
    // ek email ek hi course ke liye dobara inquiry na bhej sake.
    if (isEnrollLike && courseValue) {
      const existingForCourse = await Trial.findOne({
        email: emailLower,
        course: courseValue,
        source: { $in: ['enrollment', 'register_now', 'quick_admission'] },
      });
      if (existingForCourse) {
        return res.status(409).json({
          message: 'You have already submitted an enrollment enquiry for this course. We will contact you soon.',
        });
      }
    }
    // Source normalize: dashboard ke liye origin track karo
    const inquirySource =
      rawSource && ['free_trial', 'enrollment', 'register_now', 'quick_admission', 'contact'].includes(rawSource)
        ? rawSource
        : isEnrollLike
        ? 'enrollment'
        : 'free_trial';

    // Free trial-type (button ya general) inquiries ka status by default 'free_trial' rakho;
    // enrollment / register_now / quick_admission wali ko 'pending' hi rehne do (jab tak approve na karo).
    const initialStatus = isEnrollLike ? 'pending' : 'free_trial';
    const trial = await Trial.create({
      name: name.trim(),
      email: emailLower,
      phone: phone || '',
      course: courseValue,
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
    const trial = await Trial.findById(req.params.id);
    if (!trial) return res.status(404).json({ message: 'Inquiry not found.' });
    // Free trial wale ka status change nahi – hamesha 'free_trial' hi rehna chahiye
    if (trial.source === 'free_trial') {
      return res.status(400).json({
        message: 'Free trial inquiries have fixed status and cannot be changed.',
      });
    }
    const { status } = req.body;
    if (!['pending', 'free_trial', 'pro'].includes(status)) {
      return res.status(400).json({ message: 'Invalid status. Use pending, free_trial, or pro.' });
    }
    trial.status = status;
    await trial.save();
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
