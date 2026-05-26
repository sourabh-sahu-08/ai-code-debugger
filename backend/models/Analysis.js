const mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema(
  {
    text: { type: String, required: true },
    author: { type: String, default: 'Developer' }
  },
  { timestamps: true }
);

const ChatMessageSchema = new mongoose.Schema(
  {
    role: { type: String, enum: ['user', 'assistant'], required: true },
    content: { type: String, required: true }
  },
  { timestamps: true }
);

const AnalysisSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    originalCode: {
      type: String,
      required: [true, 'Please provide the raw code segment']
    },
    language: {
      type: String,
      required: [true, 'Please declare the programming syntax language']
    },
    findings: {
      type: String,
      required: true
    },
    correctedCode: {
      type: String,
      required: true
    },
    explanation: {
      type: String,
      required: true
    },
    timeComplexity: {
      type: String,
      default: 'N/A'
    },
    spaceComplexity: {
      type: String,
      default: 'N/A'
    },
    confidenceScore: {
      type: String,
      default: '0%'
    },
    isPublic: {
      type: Boolean,
      default: false
    },
    comments: [CommentSchema],
    chatHistory: [ChatMessageSchema]
  },
  { timestamps: true }
);

module.exports = mongoose.model('Analysis', AnalysisSchema);
