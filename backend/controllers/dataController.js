import Item from '../models/Item.js';

export const getItems = async (req, res) => {
  try {
    const items = await Item.find().sort({ createdAt: -1 });
    res.json(items);
  } catch (error) {
    res.status(500).json({ message: error.message || 'Failed to fetch items.' });
  }
};

export const getItemById = async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);
    if (!item) {
      return res.status(404).json({ message: 'Item not found.' });
    }
    res.json(item);
  } catch (error) {
    if (error.name === 'CastError') {
      return res.status(404).json({ message: 'Item not found.' });
    }
    res.status(500).json({ message: error.message || 'Failed to fetch item.' });
  }
};

export const createItem = async (req, res) => {
  try {
    const title = req.body.title;
    const description = req.body.description || '';
    const price = req.body.price;
    const imagePath = req.file ? `/uploads/${req.file.filename}` : (req.body.image || '');
    if (!title || !description || price === undefined) {
      return res.status(400).json({ message: 'Title, description and price are required.' });
    }
    const item = await Item.create({
      title,
      description,
      image: imagePath,
      price: Number(price),
    });
    res.status(201).json(item);
  } catch (error) {
    res.status(500).json({ message: error.message || 'Failed to create item.' });
  }
};

export const updateItem = async (req, res) => {
  try {
    const updates = {
      title: req.body.title,
      description: req.body.description,
      price: req.body.price != null ? Number(req.body.price) : undefined,
    };
    if (req.file) {
      updates.image = `/uploads/${req.file.filename}`;
    } else if (req.body.image !== undefined) {
      updates.image = req.body.image;
    }
    const item = await Item.findByIdAndUpdate(
      req.params.id,
      updates,
      { new: true, runValidators: true }
    );
    if (!item) {
      return res.status(404).json({ message: 'Item not found.' });
    }
    res.json(item);
  } catch (error) {
    if (error.name === 'CastError') {
      return res.status(404).json({ message: 'Item not found.' });
    }
    res.status(500).json({ message: error.message || 'Failed to update item.' });
  }
};

export const deleteItem = async (req, res) => {
  try {
    const item = await Item.findByIdAndDelete(req.params.id);
    if (!item) {
      return res.status(404).json({ message: 'Item not found.' });
    }
    res.json({ message: 'Item deleted successfully.' });
  } catch (error) {
    if (error.name === 'CastError') {
      return res.status(404).json({ message: 'Item not found.' });
    }
    res.status(500).json({ message: error.message || 'Failed to delete item.' });
  }
};
