// UltraAI - Vercel API
// api/chat.js

export default async function handler(req, res) {

  // =========================
  // CORS
  // =========================

  res.setHeader(
    "Access-Control-Allow-Origin",
    "https://kumarmanj esh3975-art.github.io"
  );

  res.setHeader(
    "Access-Control-Allow-Methods",
    "POST, OPTIONS"
  );

  res.setHeader(
    "Access-Control-Allow-Headers",
    "Content-Type"
  );

  // OPTIONS request
  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  // =========================
  // Only POST
  // =========================

  if (req.method !== "POST") {
    return res.status(405).json({
      error: "Method not allowed"
    });
  }

  try {

    // =========================
    // Get message
    // =========================

    const { message } = req.body || {};

    if (
      typeof message !== "string" ||
      !message.trim()
    ) {
      return res.status(400).json({
        error: "Message is required"
      });
    }

    // =========================
    // OpenRouter API Key
    // =========================

    const apiKey =
      process.env.OPENROUTER_API_KEY;

    if (!apiKey) {
      return res.status(500).json({
        error:
          "OPENROUTER_API_KEY Vercel Environment Variables में नहीं मिला।"
      });
    }

    // =========================
    // OpenRouter
    // =========================

    const response = await fetch(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        method: "POST",

        headers: {
          "Authorization":
            `Bearer ${apiKey}`,

          "Content-Type":
            "application/json",

          "HTTP-Referer":
            "https://kumarmanj esh3975-art.github.io",

          "X-Title":
            "UltraAI"
        },

        body: JSON.stringify({

          model:
            "openai/gpt-4.1-mini",

          messages: [

            {
              role: "system",

              content:
                "You are UltraAI, a helpful AI assistant. Reply in the same language as the user."
            },

            {
              role: "user",

              content:
                message.trim()
            }

          ],

          max_tokens: 1000

        })
      }
    );

    // =========================
    // Read response
    // =========================

    const text =
      await response.text();

    console.log(
      "OpenRouter Status:",
      response.status
    );

    console.log(
      "OpenRouter Response:",
      text
    );

    let data;

    try {

      data = JSON.parse(text);

    } catch (error) {

      return res.status(502).json({
        error:
          "OpenRouter ने valid JSON नहीं भेजा।",

        details:
          text.slice(0, 500)
      });

    }

    // =========================
    // OpenRouter Error
    // =========================

    if (!response.ok) {

      return res.status(response.status).json({

        error:
          data?.error?.message ||
          "OpenRouter request failed",

        details:
          data?.error || null

      });

    }

    // =========================
    // AI Answer
    // =========================

    const answer =
      data?.choices?.[0]?.message?.content;

    if (!answer) {

      return res.status(502).json({
        error:
          "AI response नहीं मिली।"
      });

    }

    // =========================
    // Send to UltraAI
    // =========================

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
      "UltraAI API Error:",
      error
    );

    return res.status(500).json({

      error:
        error.message ||
        "Server error"

    });

  }

}
