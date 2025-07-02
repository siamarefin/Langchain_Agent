require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { GoogleGenerativeAI } = require('@google/generative-ai');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const geminiApiKey = process.env.GEMINI_API_KEY;

if (!geminiApiKey) {
  console.error('GEMINI_API_KEY is not set in .env');
  process.exit(1);
}

app.get('/api/medicine-search', async (req, res) => {
  const query = req.query.q;
  if (!query) return res.status(400).json({ error: 'Query is required' });

  try {
    const genAI = new GoogleGenerativeAI(geminiApiKey);
    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });
    const prompt = `Give me detailed information about the medicine: ${query}`;
    const result = await model.generateContent([prompt]);
    const summary = result.response.text();

    res.json({
      summary,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch medicine info' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});