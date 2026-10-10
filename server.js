require('dotenv').config();
const express = require('express');
const path = require('path');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

const hardwareSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  category: { type: String, required: true, trim: true },
  description: { type: String, required: true },
  price: { type: Number, required: true, min: 0 },
  stock: { type: Number, default: 0, min: 0 },
  image: { type: String, required: true },
  featured: { type: Boolean, default: false }
}, { timestamps: true });

const Hardware = mongoose.model('Hardware', hardwareSchema);

app.get('/api/health', (_req, res) => res.json({ status: 'ok', database: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected' }));

app.get('/api/hardware', async (req, res) => {
  try {
    const { category, search, sort = 'featured' } = req.query;
    const query = {};
    if (category && category !== 'All') query.category = category;
    if (search) query.$or = [
      { name: { $regex: search, $options: 'i' } },
      { category: { $regex: search, $options: 'i' } },
      { description: { $regex: search, $options: 'i' } }
    ];
    const sortOptions = sort === 'price-low' ? { price: 1 } : sort === 'price-high' ? { price: -1 } : { featured: -1, createdAt: -1 };
    const items = await Hardware.find(query).sort(sortOptions).lean();
    res.json({ items, count: items.length });
  } catch (error) {
    res.status(500).json({ error: 'Could not load hardware items.' });
  }
});

app.get('/api/hardware/:id', async (req, res) => {
  try {
    const item = await Hardware.findById(req.params.id).lean();
    if (!item) return res.status(404).json({ error: 'Hardware item not found.' });
    res.json(item);
  } catch (_error) {
    res.status(400).json({ error: 'Invalid hardware item id.' });
  }
});

async function start() {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/hardware_hub');
    app.listen(PORT, () => console.log(`Hardware Hub is running at http://localhost:${PORT}`));
  } catch (error) {
    console.error('MongoDB connection failed. Check MONGODB_URI and make sure MongoDB is running.');
    console.error(error.message);
    process.exit(1);
  }
}

if (require.main === module) start();
module.exports = { app, Hardware };
