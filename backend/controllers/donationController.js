import Donation, { DONATE_TYPES } from '../models/Donation.js';

export const submitDonation = async (req, res) => {
  try {
    const { name, phone, amount, donateType } = req.body;
    if (!name || !phone || !amount) {
      return res.status(400).json({ message: 'Name, phone and amount are required.' });
    }
    const type = DONATE_TYPES.includes(donateType) ? donateType : DONATE_TYPES[0];
    const receiptPath = req.file ? `/uploads/${req.file.filename}` : '';
    const donation = await Donation.create({
      name: String(name).trim(),
      phone: String(phone).trim(),
      amount: String(amount).trim(),
      donateType: type,
      receipt: receiptPath,
    });
    res.status(201).json(donation);
  } catch (error) {
    res.status(500).json({ message: error.message || 'Failed to submit donation.' });
  }
};

export const getDonations = async (req, res) => {
  try {
    const donations = await Donation.find().sort({ createdAt: -1 });
    res.json(donations);
  } catch (error) {
    res.status(500).json({ message: error.message || 'Failed to fetch donations.' });
  }
};
