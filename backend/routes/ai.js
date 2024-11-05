import express from 'express';
import fetch from 'node-fetch';
import dotenv from 'dotenv';

// Load environment variables for security
dotenv.config();

const router = express.Router();

const gemini_api_url = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent';
const gemini_api_key = process.env.GEMINI_API_KEY;

// AI endpoint to handle requests from the frontend
router.post('/', async (req, res) => {
  const { query } = req.body; // Get the user's query from the request body

  // Prompt before querying AI
  const prompt = `. If this query is not related to food, meal plans, health, nutrition or workout related queries then just respond with Please ask food or health-related problems only.`;

  try {
    const response = await fetch(`${gemini_api_url}?key=${gemini_api_key}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [{ parts: [{ text: `${query}${prompt}` }] }], // Attach prompt to the user's query
      }),
    });

    const data = await response.json();
    // console.log(data);

    if (response.ok && data.candidates && data.candidates[0].content.parts) {
      const answerText = data.candidates[0].content.parts[0].text || "No valid response from AI"; // Access the text in parts array
      return res.status(200).json({ answer: answerText });
    } else {
      return res.status(500).json({ message: 'AI response failed', error: data });
    }

  } catch (error) {
    return res.status(500).json({ message: 'An error occurred', error });
  }
});

export default router;
