const { Groq } = require('groq-sdk');
const Analysis = require('../models/Analysis');

// Ensure Groq API Key is configured
const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY
});

// @desc    Analyzes custom developer source code and saves audit metrics
// @route   POST /api/analyze
// @access  Private
exports.analyzeCode = async (req, res, next) => {
  try {
    const { code, language } = req.body;

    if (!code) {
      return res.status(400).json({ success: false, message: 'Please provide code to review' });
    }

    // Call Groq API with strict JSON formatting prompts
    const prompt = `You are a Senior Principal Software Engineer. You must perform an incredibly thorough, granular audit of the following code.
Format your response as a strict, raw JSON block. Do not wrap the JSON in Markdown code block formatting. Do not output anything before or after the raw JSON.

The JSON object MUST contain precisely the following fields:
{
  "findings": "Detailed, professional Markdown list highlighting logic edge cases, memory inefficiencies, OWASP security issues, and stylistic problems.",
  "correctedCode": "The fully corrected, refactored, optimized code block (entire snippet, drop-in replacement).",
  "explanation": "Clear, logical markdown reasoning explaining exactly what changes were implemented and why.",
  "timeComplexity": "Big-O time complexity notation (e.g., O(1), O(N), O(log N)).",
  "spaceComplexity": "Big-O space complexity notation (e.g., O(1), O(N)).",
  "confidenceScore": "A percentage value (e.g., 95%) representing correctness likelihood."
}

Programming Language Syntax: ${language}
Raw Code Input:
${code}`;

    const completion = await groq.chat.completions.create({
      messages: [
        {
          role: 'system',
          content: 'You are a strict, top-tier automated code auditing bot that outputs ONLY raw JSON.'
        },
        {
          role: 'user',
          content: prompt
        }
      ],
      model: 'llama3-8b-8192',
      response_format: { type: 'json_object' }
    });

    const content = completion.choices[0].message.content.trim();
    let auditResults;

    try {
      auditResults = JSON.parse(content);
    } catch (parseErr) {
      console.error("Groq JSON parsing failed. raw output:", content);
      return res.status(500).json({
        success: false,
        message: 'Neural engine generated unstructured response. Please try running again.'
      });
    }

    // Save report in Database
    const analysis = await Analysis.create({
      user: req.user.id,
      originalCode: code,
      language,
      findings: auditResults.findings,
      correctedCode: auditResults.correctedCode,
      explanation: auditResults.explanation,
      timeComplexity: auditResults.timeComplexity,
      spaceComplexity: auditResults.spaceComplexity,
      confidenceScore: auditResults.confidenceScore || '90%',
      chatHistory: [
        {
          role: 'assistant',
          content: `Standard AI Code Audit Completed. Logical correctness estimate: ${auditResults.confidenceScore || '90%'}. Let me know if you would like me to explain any particular line of code or refine security checklists.`
        }
      ]
    });

    res.status(200).json({ success: true, data: analysis });
  } catch (err) {
    next(err);
  }
};

// @desc    Get complete saved analysis history of logged-in developer
// @route   GET /api/analyze/history
// @access  Private
exports.getHistory = async (req, res, next) => {
  try {
    const history = await Analysis.find({ user: req.user.id }).sort('-createdAt');
    res.status(200).json({ success: true, data: history });
  } catch (err) {
    next(err);
  }
};

// @desc    Fetch specific detailed audit session by ID
// @route   GET /api/analyze/:id
// @access  Private
exports.getAnalysisById = async (req, res, next) => {
  try {
    const analysis = await Analysis.findOne({ _id: req.params.id, user: req.user.id });
    if (!analysis) {
      return res.status(404).json({ success: false, message: 'Audit report not found in Nexus archives' });
    }
    res.status(200).json({ success: true, data: analysis });
  } catch (err) {
    next(err);
  }
};

// @desc    Securely delete analysis log from user index
// @route   DELETE /api/analyze/:id
// @access  Private
exports.deleteAnalysis = async (req, res, next) => {
  try {
    const analysis = await Analysis.findOneAndDelete({ _id: req.params.id, user: req.user.id });
    if (!analysis) {
      return res.status(404).json({ success: false, message: 'Audit report not found' });
    }
    res.status(200).json({ success: true, message: 'Purged successfully' });
  } catch (err) {
    next(err);
  }
};

// @desc    Toggle public share link options for reports
// @route   PUT /api/analyze/:id/toggle-public
// @access  Private
exports.togglePublic = async (req, res, next) => {
  try {
    const analysis = await Analysis.findOne({ _id: req.params.id, user: req.user.id });
    if (!analysis) {
      return res.status(404).json({ success: false, message: 'Report not found' });
    }

    analysis.isPublic = !analysis.isPublic;
    await analysis.save();

    res.status(200).json({ success: true, data: analysis });
  } catch (err) {
    next(err);
  }
};

// @desc    Add standard notes to saved code analyses sheets
// @route   POST /api/analyze/:id/comment
// @access  Private
exports.addComment = async (req, res, next) => {
  try {
    const { text } = req.body;
    if (!text) {
      return res.status(400).json({ success: false, message: 'Please provide note text' });
    }

    const analysis = await Analysis.findOne({ _id: req.params.id, user: req.user.id });
    if (!analysis) {
      return res.status(404).json({ success: false, message: 'Report not found' });
    }

    analysis.comments.push({ text });
    await analysis.save();

    res.status(200).json({ success: true, data: analysis.comments });
  } catch (err) {
    next(err);
  }
};

// @desc    Delete custom note from report list
// @route   DELETE /api/analyze/:id/comment/:commentId
// @access  Private
exports.deleteComment = async (req, res, next) => {
  try {
    const analysis = await Analysis.findOne({ _id: req.params.id, user: req.user.id });
    if (!analysis) {
      return res.status(404).json({ success: false, message: 'Report not found' });
    }

    analysis.comments = analysis.comments.filter((c) => c._id.toString() !== req.params.commentId);
    await analysis.save();

    res.status(200).json({ success: true, data: analysis.comments });
  } catch (err) {
    next(err);
  }
};

// @desc    Conversational follow-up assistant inside detailed report sheets
// @route   POST /api/analyze/:id/chat
// @access  Private
exports.chatWithAI = async (req, res, next) => {
  try {
    const { message } = req.body;
    if (!message) {
      return res.status(400).json({ success: false, message: 'Please enter a chat message' });
    }

    const analysis = await Analysis.findOne({ _id: req.params.id, user: req.user.id });
    if (!analysis) {
      return res.status(404).json({ success: false, message: 'Report not found' });
    }

    // Capture standard conversation history to feed to Groq
    const historyMessages = analysis.chatHistory.map((h) => ({
      role: h.role,
      content: h.content
    }));

    const promptMessages = [
      {
        role: 'system',
        content: `You are a Senior Principal Software Engineer assistant. You are reviewing the following code and findings with the developer:
Programming Language: ${analysis.language}
Raw Input Code:
${analysis.originalCode}

Identified Logical findings:
${analysis.findings}

Optimized Drop-in Replacement Code:
${analysis.correctedCode}

Theoretical reasoning:
${analysis.explanation}

Answer the developer's questions clearly, factually, and professionally based on the code contexts above. Keep explanations extremely concise and targeted.`
      },
      ...historyMessages,
      { role: 'user', content: message }
    ];

    const completion = await groq.chat.completions.create({
      messages: promptMessages,
      model: 'llama3-8b-8192'
    });

    const reply = completion.choices[0].message.content.trim();

    analysis.chatHistory.push({ role: 'user', content: message });
    analysis.chatHistory.push({ role: 'assistant', content: reply });
    await analysis.save();

    res.status(200).json({ success: true, data: analysis.chatHistory });
  } catch (err) {
    next(err);
  }
};

// @desc    Public display page for shared report comparison links
// @route   GET /api/analyze/public/:id
// @access  Public
exports.getPublicAnalysis = async (req, res, next) => {
  try {
    const analysis = await Analysis.findById(req.params.id);
    if (!analysis || !analysis.isPublic) {
      return res.status(403).json({ success: false, message: 'Access denied: report is private or does not exist.' });
    }
    res.status(200).json({ success: true, data: analysis });
  } catch (err) {
    next(err);
  }
};
