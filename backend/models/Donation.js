import mongoose from 'mongoose';

const donationSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    phone: { type: String, required: true, trim: true },
    amount: { type: String, required: true, trim: true },
    donateType: { type: String, enum: ['Donate for Madrasa', 'Donate for Mosque', 'Fitrana & Sadaqa'], required: true },
  },
  { timestamps: true }
);

const Donation = mongoose.model('Donation', donationSchema);
export default Donation;
