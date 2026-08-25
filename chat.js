// ==========================================
// UltraAI - Vercel API
// File: api/chat.js
// ==========================================

export default async function handler(req, res) {

  // ========================================
  // CORS
  // ========================================

  res.setHeader(
    "Access-Control-Allow-Origin",
    "*"
  );

  res.setHeader(
    "Access-Control-Allow-Methods",
    "POST, OPTIONS"
  );

  res.setHeader(
    "Access-Control-Allow-Headers",
    "Content-Type"
  );

  // Browser preflight request
  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  // ========================================
  // POST request only
  // ========================================

  if (req.method !== "POST") {
    return res.status(405).json({
      error: "Method not allowed"
    });
  }

  try {

    // ======================================
    // Get user message
    // ======================================

    const body = req.body || {};

    const message = body.message;

    if (
      typeof message !== "string" ||
      message.trim().length === 0
    ) {
      return res.status(400).json({
        error: "Message is required"
      });
    }

    // ======================================
    // OpenRouter API Key
    // ======================================

    const apiKey =
      process.env.OPENROUTER_API_KEY;

    if (!apiKey) {
      return res.status(500).json({
        error:
          "OPENROUTER_API_KEY Vercel Environment Variables में सेट नहीं है।"
      });
    }

    // ======================================
    // Call OpenRouter
    // ======================================

    const response = await fetch(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        method: "POST",

        headers: {
          "Authorization": `Bearer ${apiKey}`,
          "Content-Type": "application/json"
        },

        body: JSON.stringify({

          model: "openai/gpt-4.1-mini",

          messages: [

            {
              role: "system",
              content:
                "You are UltraAI, a helpful AI assistant. Always reply in the same language as the user."
            },

            {
              role: "user",
              content: message.trim()
            }

          ],

          max_tokens: 1000

        })
      }
    );

    // ======================================
    // Read OpenRouter response
    // ======================================

    const rawText =
      await response.text();

    console.log(
      "OpenRouter Status:",
      response.status
    );

    console.log(
      "OpenRouter Response:",
      rawText
    );

    // ======================================
    // Convert response to JSON
    // ======================================

    let data;

    try {

      data = JSON.parse(rawText);

    } catch (error) {

      return res.status(502).json({
        error:
          "OpenRouter ने valid JSON नहीं भेजा।",
        details:
          rawText.substring(0, 500)
      });

    }

    // ======================================
    // OpenRouter error
    // ======================================

    if (!response.ok) {

      return res.status(response.status).json({

        error:
          data?.error?.message ||
          "OpenRouter request failed",

        code:
          data?.error?.code || null

      });

    }

    // ======================================
    // Get AI answer
    // ======================================

    const answer =
      data?.choices?.[0]?.message?.content;

    if (
      typeof answer !== "string" ||
      answer.trim().length === 0
    ) {

      return res.status(502).json({
        error:
          "AI response नहीं मिली।"
      });

    }

    // ======================================
    // Send answer to UltraAI
    // ======================================

    return res.status(200).json({

      choices: [

        {
          message: {
            content: answer
          }
        }

      ]

    });

  } catch (error) {

    console.error(
      "UltraAI Server Error:",
      error
    );

    return res.status(500).json({

      error:
        error?.message ||
        "Internal server error"

    });

  }

}
