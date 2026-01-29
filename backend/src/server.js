require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Import Models
const Settings = require('./models/Settings');
const Admin = require('./models/Admin');
const { Schedule, Fact, Blog, Asana } = require('./models/Content');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// Root Route (Health Check)
app.get('/', (req, res) => {
  res.json({
    message: "smriti.yoga API is running",
    status: "healthy",
    time: new Date().toISOString()
  });
});

// Multer Configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const dir = './uploads';
    if (!fs.existsSync(dir)) fs.mkdirSync(dir);
    cb(null, dir);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  }
});
const upload = multer({ storage });

// Image Upload Route
app.post('/api/upload', upload.single('image'), (req, res) => {
  if (!req.file) return res.status(400).json({ error: 'No file uploaded' });
  const imageUrl = `${process.env.API_BASE_URL || 'http://localhost:5000'}/uploads/${req.file.filename}`;
  res.json({ imageUrl });
});

// Secret Key for Security
const JWT_SECRET = process.env.JWT_SECRET || "supersecretkey123";

// --- DATABASE CONNECTION ---
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Atlas Connected Successfully"))
  .catch((err) => {
    console.error("❌ MongoDB Connection Error:", err);
    process.exit(1);
  });

// --- ROUTES ---

// 1. PUBLIC: Get WhatsApp Number
app.get('/api/settings', async (req, res) => {
  try {
    let settings = await Settings.findOne();
    if (!settings) settings = await Settings.create({});
    res.json(settings);
  } catch (err) {
    res.status(500).json({ error: "Server Error" });
  }
});

// 2. ADMIN SETUP: Create Admin (Run once via Postman)
app.post('/api/admin/create', async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash("admin123", 10); // Password: admin123
    const newAdmin = await Admin.create({ username: "admin", password: hashedPassword });
    res.json(newAdmin);
  } catch (err) {
    res.status(500).json({ error: "Admin creation failed (maybe username exists?)" });
  }
});

// 3. ADMIN LOGIN
app.post('/api/admin/login', async (req, res) => {
  const { username, password } = req.body;
  const admin = await Admin.findOne({ username });
  if (!admin) return res.status(400).json({ error: "User not found" });

  const isMatch = await bcrypt.compare(password, admin.password);
  if (!isMatch) return res.status(400).json({ error: "Invalid credentials" });

  const token = jwt.sign({ id: admin._id }, JWT_SECRET);
  res.json({ token });
});

// 4. ADMIN DASHBOARD: Get All Data (Protected)
app.get('/api/content', async (req, res) => {
  try {
    const schedule = await Schedule.find();
    const facts = await Fact.find();
    const blogs = await Blog.find().sort({ date: -1 });
    const asanas = await Asana.find().sort({ date: -1 });
    res.json({ schedule, facts, blogs, asanas });
  } catch (err) {
    res.status(500).json({ error: "Fetch failed" });
  }
});

// 5. ADMIN DASHBOARD: Add Schedule
app.post('/api/schedule', async (req, res) => {
  try {
    console.log("Receiving new schedule data:", req.body);
    const newClass = await Schedule.create(req.body);
    res.json(newClass);
  } catch (err) {
    console.error("Add schedule error:", err);
    res.status(500).json({ error: "Failed to add class" });
  }
});

// 6. ADMIN DASHBOARD: Add Fact
app.post('/api/fact', async (req, res) => {
  try {
    const newFact = await Fact.create(req.body);
    res.json(newFact);
  } catch (err) {
    res.status(500).json({ error: "Failed to add fact" });
  }
});

// 6.1 ADMIN DASHBOARD: Add Blog
app.post('/api/blog', async (req, res) => {
  try {
    const newBlog = await Blog.create(req.body);
    res.json(newBlog);
  } catch (err) {
    console.error("Add blog error:", err);
    res.status(500).json({ error: "Failed to add blog" });
  }
});

// 6.2 ADMIN DASHBOARD: Add Asana
app.post('/api/asana', async (req, res) => {
  try {
    const newAsana = await Asana.create(req.body);
    res.json(newAsana);
  } catch (err) {
    console.error("Add asana error:", err);
    res.status(500).json({ error: "Failed to add asana" });
  }
});

// 7. ADMIN DASHBOARD: Delete Item
app.delete('/api/delete/:type/:id', async (req, res) => {
  const { type, id } = req.params;
  try {
    if (type === 'schedule') await Schedule.findByIdAndDelete(id);
    if (type === 'fact') await Fact.findByIdAndDelete(id);
    if (type === 'blog') await Blog.findByIdAndDelete(id);
    if (type === 'asana') await Asana.findByIdAndDelete(id);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: "Delete failed" });
  }
});

// 8. ADMIN SETTINGS: Update WhatsApp Number
app.put('/api/admin/settings', async (req, res) => {
  const { adminPhone, welcomeMessage } = req.body;
  try {
    const settings = await Settings.findOneAndUpdate(
      {},
      { adminPhone, welcomeMessage },
      { new: true, upsert: true }
    );
    res.json(settings);
  } catch (err) {
    res.status(500).json({ error: "Update Failed" });
  }
});

// --- SERVER START ---
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));