const Groq = require('groq-sdk');

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY || 'dummy_key',
});

const getSystemPrompt = (mode, language) => {
  const basePrompt = `You are KhudSeKrle's elite AI debugging engine. 
Analyze the provided ${language} code. 
Return your response STRICTLY as a valid JSON object. Do not include markdown code blocks around the JSON.
Your JSON must strictly match this structure:
{
  "summary": "A short, 1-2 sentence explanation of the primary issue",
  "severity": "critical|high|medium|low|info",
  "issues": [
    {
      "title": "Short title",
      "description": "Details about the issue",
      "lineStart": 1,
      "lineEnd": 2
    }
  ],
  "affectedLines": [1, 2],
  "rootCause": "Detailed explanation of why this happened fundamentally",
  "explanation": "Beginner-friendly explanation of the concepts involved",
  "suggestedFix": "The exact corrected code block",
  "whyFixWorks": "Explanation of how the new code resolves the root cause",
  "preventionTips": ["Tip 1", "Tip 2"]
}`;

  if (mode === 'mentor') {
    return `${basePrompt}\n\nAct as a senior developer mentoring a junior. Focus heavily on code quality, architecture, performance, security, and best practices. Your explanation should be educational and thorough.`;
  }
  if (mode === 'learning') {
    return `${basePrompt}\n\nAct as a Socratic tutor. Do not provide the complete direct fix in the explanation. Guide the user toward the solution conceptually. Provide hints.`;
  }
  
  return basePrompt; // default 'quick-fix'
};

exports.analyzeCode = async (code, language = 'javascript', mode = 'quick-fix') => {
  // Return a beautiful mock response if no API key is provided, allowing UI testing
  if (!process.env.GROQ_API_KEY || process.env.GROQ_API_KEY === 'dummy_key') {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          summary: "Mock: Unhandled Promise Rejection",
          severity: "high",
          issues: [
            {
              title: "Missing Catch Block",
              description: "The promise chain lacks a catch block to handle potential errors.",
              lineStart: 1,
              lineEnd: 5
            }
          ],
          affectedLines: [3, 4],
          rootCause: "When an asynchronous operation fails, the rejection must be explicitly handled. Since this code doesn't provide a .catch() or use try/catch in an async function, the Node process will crash or the browser will throw an uncaught exception.",
          explanation: "Think of a Promise like ordering a pizza. You expect it to arrive (resolve), but sometimes the delivery driver gets lost (reject). If you don't have a plan for what to do when it gets lost (a catch block), you'll just wait forever and starve! Always handle the failure case.",
          suggestedFix: "fetch('/api/data')\n  .then(res => res.json())\n  .then(data => console.log(data))\n  .catch(err => console.error('Failed to fetch:', err));",
          whyFixWorks: "Adding the .catch() block ensures that any network errors or parsing errors are gracefully logged instead of crashing the application.",
          preventionTips: ["Always append .catch() to Promise chains", "Use async/await with try/catch blocks for better readability"]
        });
      }, 1500);
    });
  }

  try {
    const chatCompletion = await groq.chat.completions.create({
      messages: [
        { role: 'system', content: getSystemPrompt(mode, language) },
        { role: 'user', content: `Here is the code to analyze:\n\n${code}` }
      ],
      model: process.env.AI_MODEL || 'llama3-8b-8192',
      temperature: 0.2,
      response_format: { type: "json_object" }
    });

    const responseContent = chatCompletion.choices[0]?.message?.content;
    if (!responseContent) throw new Error("No response from AI model");

    return JSON.parse(responseContent);
  } catch (error) {
    console.error('AI Service Error:', error);
    throw new Error('Failed to analyze code with AI service');
  }
};
