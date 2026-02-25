import Donation, { DONATE_TYPES } from '../models/Donation.js';

// Receipt image ke liye full URL banao – data map karte waqt img src mein use karo
function getReceiptFullUrl(req, path) {
  if (!path || !path.trim()) return '';
  if (path.startsWith('http')) return path;
  const base = process.env.API_URL || process.env.BASE_URL || `${req.protocol}://${req.get('host')}`;
  return `${base.replace(/\/$/, '')}${path.startsWith('/') ? path : '/' + path}`;
}

// Donation form ke mutabiq: name, phone, amount, donateType, receipt (optional image/PDF)
export const submitDonation = async (req, res) => {
  try {
    const { name, phone, amount, donateType } = req.body || {};
    const trimmedName = String(name || '').trim();
    const trimmedPhone = String(phone || '').trim();
    const trimmedAmount = String(amount || '').trim();
    const trimmedType = String(donateType || '').trim();

    if (!trimmedName || !trimmedPhone || !trimmedAmount) {
      return res.status(400).json({ message: 'Name, phone and amount are required.' });
    }

    const type = DONATE_TYPES.includes(trimmedType) ? trimmedType : DONATE_TYPES[0];
    const receiptPath = req.file ? `/uploads/${req.file.filename}` : '';
    const submittedAt = new Date(); // form submit hone wala date/time

    const donation = await Donation.create({
      name: trimmedName,
      phone: trimmedPhone,
      amount: trimmedAmount,
      donateType: type,
      receipt: receiptPath,
      submittedAt,
    });

    const doc = donation.toObject ? donation.toObject() : donation;
    doc.receiptUrl = getReceiptFullUrl(req, receiptPath); // image ke liye full URL
    res.status(201).json(doc);
  } catch (error) {
    res.status(500).json({ message: error.message || 'Failed to submit donation.' });
  }
};

// Dashboard ke liye: form jaisi saari fields + date + image URL (map karne ke liye)
// Response: _id, name, phone, amount, donateType, receipt, receiptUrl, submittedAt, createdAt, updatedAt
export const getDonations = async (req, res) => {
  try {
    const donations = await Donation.find()
      .sort({ submittedAt: -1, createdAt: -1 })
      .lean();
    const withReceiptUrl = donations.map((d) => ({
      ...d,
      receiptUrl: getReceiptFullUrl(req, d.receipt),
    }));
    res.json(withReceiptUrl);
  } catch (error) {
    res.status(500).json({ message: error.message || 'Failed to fetch donations.' });
  }
};
