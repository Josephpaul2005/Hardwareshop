require('dotenv').config();
const mongoose = require('mongoose');
const { Hardware } = require('./server');

const products = [
  { name: 'AeroFlow 120 RGB', category: 'Cooling', description: 'Quiet PWM case fan with a smooth addressable RGB light ring.', price: 24.99, stock: 18, image: 'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?auto=format&fit=crop&w=900&q=85', featured: true },
  { name: 'Phantom RTX 4070', category: 'Graphics Cards', description: 'High-performance graphics for crisp 1440p gaming and creative work.', price: 599.00, stock: 6, image: 'https://images.unsplash.com/photo-1591488320449-011701bb6704?auto=format&fit=crop&w=900&q=85', featured: true },
  { name: 'TitanForge ATX Case', category: 'Cases', description: 'Airflow-focused mid tower with a tempered glass side panel.', price: 129.99, stock: 11, image: 'https://images.unsplash.com/photo-1587202372634-32705e3bf49c?auto=format&fit=crop&w=900&q=85', featured: true },
  { name: 'Pulse 32GB DDR5', category: 'Memory', description: 'Responsive 6000MHz dual-channel memory kit with a low-profile heat spreader.', price: 109.99, stock: 22, image: 'https://images.unsplash.com/photo-1562976540-1502c2145186?auto=format&fit=crop&w=900&q=85', featured: false },
  { name: 'Nova 2TB NVMe', category: 'Storage', description: 'Fast PCIe Gen 4 solid-state storage for games, projects, and big ideas.', price: 149.50, stock: 14, image: 'https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?auto=format&fit=crop&w=900&q=85', featured: false },
  { name: 'Axiom B760 WiFi', category: 'Motherboards', description: 'Feature-rich ATX motherboard with Wi-Fi 6E and next-gen connectivity.', price: 189.99, stock: 9, image: 'https://images.unsplash.com/photo-1555617981-dac3880eac6e?auto=format&fit=crop&w=900&q=85', featured: false },
  { name: 'VoltCore 850 Gold', category: 'Power Supplies', description: 'Fully modular 850W power supply with quiet cooling and 80 Plus Gold efficiency.', price: 139.00, stock: 7, image: 'https://images.unsplash.com/photo-1624705002806-5d72df19c3ad?auto=format&fit=crop&w=900&q=85', featured: false },
  { name: 'Frostline 240 AIO', category: 'Cooling', description: 'Clean, quiet liquid CPU cooling with a vivid display pump head.', price: 119.99, stock: 12, image: 'https://images.unsplash.com/photo-1587202372616-b43abea06c2a?auto=format&fit=crop&w=900&q=85', featured: false }
];

async function seed() {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/hardware_hub');
    await Hardware.deleteMany({});
    await Hardware.insertMany(products);
    console.log(`Inserted ${products.length} demo hardware items.`);
  } catch (error) {
    console.error('Seed failed:', error.message);
    process.exitCode = 1;
  } finally {
    await mongoose.disconnect();
  }
}

seed();
