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

// Add course: title, description, image (lazmi) – yahi fields existing courses jaisi; add hone ke baad home pe courses section mein dikhengi
export const createItem = async (req, res) => {
  try {
    const title = (req.body.title || '').trim();
    const description = (req.body.description || '').trim();
    const imagePath = req.file ? `/uploads/${req.file.filename}` : (req.body.image || '').trim();
    if (!title || !description) {
      return res.status(400).json({ message: 'Title and description are required.' });
    }
    if (!imagePath) {
      return res.status(400).json({ message: 'Image is required. Upload a file or provide image URL.' });
    }
    const price = req.body.price !== undefined && req.body.price !== '' ? Number(req.body.price) : 0;
    const item = await Item.create({
      title,
      description,
      image: imagePath,
      price,
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

// Pehle se add kiye hue default courses (manual list) ko DB mein seed karo – ek baar chalana
const DEFAULT_COURSES = [
  { title: 'Tajweed & Qira\'at Sab\'ah Ashrah', description: 'Learn correct pronunciation and the ten famous recitations (Qira\'at). Master rules of Tajweed—including Makharij, Sifaat, and Idghaam—and the authentic ways of reciting the Quran. Our qualified teachers guide you through each rule with practice and feedback so you can recite with clarity and beauty.', image: '/images/tajweed.jpg', price: 0 },
  { title: 'Noorani Qaida', description: 'Foundation course for beginners. Start with Arabic letters, correct pronunciation (Makharij), joining letters, and basic reading skills for Quran. Step-by-step lessons with one-to-one attention so you build a strong base before moving to Nazra or Tajweed. Ideal for children and adults new to Arabic.', image: '/images/norani%20quaidaa.jpeg', price: 0 },
  { title: 'Nazra Quran Karim', description: 'Learn to read the Holy Quran with correct pronunciation and fluency. Step-by-step reading practice with teacher guidance, building from simple verses to longer passages. Regular revision and correction help you gain confidence and accuracy. Suitable after completing Noorani Qaida or equivalent.', image: '/images/nazra.jpg', price: 0 },
  { title: 'Hifz ul Quran', description: 'Structured memorization of the complete Quran with one-to-one support from qualified Hafiz teachers. We follow a proven schedule: new verses, revision of recent portions, and cumulative review so you retain what you learn. Progress is tracked and adjusted to your pace. Whether you aim for full Hifz or selected Surahs, our teachers help you achieve steady, lasting progress with discipline and encouragement.', image: '/images/hifz%20ul%20quran.jpg', price: 0 },
  { title: 'Tarjuma Quran Majid', description: 'Understand the meaning of the Quran through translation in Urdu and English. Word-by-word and verse-by-verse explanation so you connect with the message. Teachers clarify context and key terms, helping you apply the lessons in daily life. Ideal for those who can read Quran and want to deepen their understanding.', image: '/images/tarjuma.jpg', price: 0 },
  { title: 'Tafseer Quran Majid', description: 'In-depth study of Quranic commentary and context. Learn interpretation (Tafseer), reasons of revelation (Asbab al-Nuzul), and practical lessons for life. Our teachers use reliable classical and modern sources to explain verses clearly. Suitable for students who have completed Nazra and want to understand the Quran in depth.', image: '/images/tafseer%20e%20quran%20majee.jpg', price: 0 },
  { title: 'Dunyawi Taleem', description: 'Basic worldly education alongside Islamic learning. We offer support for school subjects and useful life skills where needed, so students can balance Deen and Dunya. Tailored to the level and needs of each student, with focus on clarity and practical use.', image: '/images/duniyawi.jpg', price: 0 },
  { title: 'Basic Masail', description: 'Essential Islamic rulings: purity (Taharah), prayer (Salah), fasting (Sawm), Zakat, and daily life masail. Simple, clear answers from authentic sources so you can act with confidence. Ideal for children and adults who want to learn correct practice without overwhelming detail.', image: '/images/basic%20masail.jpg', price: 0 },
];

export const seedItems = async (req, res) => {
  try {
    const existing = await Item.countDocuments();
    if (existing > 0) {
      return res.status(400).json({ message: 'Courses already exist. Seed only when table is empty.' });
    }
    const inserted = await Item.insertMany(DEFAULT_COURSES);
    res.status(201).json({ message: `Seeded ${inserted.length} courses.`, count: inserted.length });
  } catch (error) {
    res.status(500).json({ message: error.message || 'Failed to seed courses.' });
  }
};
