const express = require("express");
const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));

const router = express.Router();

// Store the Gemini API key in an environment variable (GEMINI_API_KEY)
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

// Route to generate suggestion for a course
router.post("/suggest", async (req, res) => {
  const { courseName } = req.body;

  if (!courseName) {
    return res.status(400).json({ error: "Course name is required" });
  }

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: `Give me a roadmap to master the subject "${courseName}". Break it down into steps.`,
                },
              ],
            },
          ],
        }),
      }
    );

    if (!response.ok) {
      throw new Error("Failed to generate suggestion");
    }

    const data = await response.json();
    const suggestionText =
      data.candidates?.[0]?.content?.parts?.[0]?.text ||
      "No suggestion available";

    res.json({ suggestion: suggestionText });
  } catch (error) {
    console.error("Error generating suggestion:", error.message);
    res.status(500).json({ error: "Failed to generate suggestion" });
  }
});

module.exports = router;
