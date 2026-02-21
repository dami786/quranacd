import mongoose from 'mongoose';

const DONATE_TYPES = ['Donate in mosque/madrasah construction', 'Donate for needy children', 'Donate for another charity'];

const donationSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    phone: { type: String, required: true, trim: true },
    amount: { type: String, required: true, trim: true },
    donateType: { type: String, enum: DONATE_TYPES, required: true },
    receipt: { type: String, trim: true, default: '' }, // path to uploaded receipt file
  },
  { timestamps: true }
);

export { DONATE_TYPES };

const Donation = mongoose.model('Donation', donationSchema);
export default Donation;
