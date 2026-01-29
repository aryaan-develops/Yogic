const mongoose = require('mongoose');

const ScheduleSchema = new mongoose.Schema({
  fromDay: String,
  toDay: String,
  time: String,
  batch: String, // e.g., "Morning Flow"
  notes: String,
  whatsapp: String
});

const FactSchema = new mongoose.Schema({
  title: String,
  description: String,
  date: { type: Date, default: Date.now }
});

const BlogSchema = new mongoose.Schema({
  title: String,
  content: String,
  author: { type: String, default: "Smriti" },
  tags: [String],
  image: String,
  date: { type: Date, default: Date.now }
});

const AsanaSchema = new mongoose.Schema({
  name: String,
  benefits: String,
  description: String,
  image: String,
  date: { type: Date, default: Date.now }
});

module.exports = {
  Schedule: mongoose.model('Schedule', ScheduleSchema),
  Fact: mongoose.model('Fact', FactSchema),
  Blog: mongoose.model('Blog', BlogSchema),
  Asana: mongoose.model('Asana', AsanaSchema)
};