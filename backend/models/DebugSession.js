const mongoose = require('mongoose');

const DebugSessionSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true
  },
  project: {
    type: mongoose.Schema.ObjectId,
    ref: 'Project'
  },
  code: {
    type: String,
    required: [true, 'Please provide code']
  },
  language: {
    type: String,
    default: 'javascript'
  },
  aiResponse: {
    type: Object, // Stores the structured JSON from AI
    required: true
  },
  status: {
    type: String,
    enum: ['Open', 'Resolved', 'In Progress'],
    default: 'Open'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('DebugSession', DebugSessionSchema);
