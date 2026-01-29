const mongoose = require('mongoose');

const settingsSchema = new mongoose.Schema({
  adminPhone: { 
    type: String, 
    required: true, 
    default: "919876543210" // Default dummy number
  },
  welcomeMessage: {
    type: String,
    default: "Hi! I want to join the yoga class."
  }
});

module.exports = mongoose.model('Settings', settingsSchema);