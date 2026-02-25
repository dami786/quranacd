import mongoose from 'mongoose';

const itemSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Title is required'],
      trim: true,
    },
    description: {
      type: String,
      required: [true, 'Description is required'],
      trim: true,
    },
    image: {
      type: String,
      default: '',
      trim: true,
    },
    price: { type: Number, min: 0, default: 0 },
  },
  { timestamps: true }
);

const Item = mongoose.model('Item', itemSchema);
export default Item;
