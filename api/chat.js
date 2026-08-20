// UltraAI - Vercel API
// api/chat.js

export default async function handler(req, res) {
  // Only POST allowed
  if (req.method !== "POST") {
    return res.status(405).json({
      error: "Method not allowed"
    });
  }

  try {
    const { message } = req.body || {};

    if (!message || !message.trim()) {
      return res.status(400).json({
        error: "Message is required"
      });
    }

    const apiKey = process.env.OPENROUTER_API_KEY;

    if (!apiKey) {
      return res.status(500).json({
        error: "OPENROUTER_API_KEY Vercel में सेट नहीं है।"
      });
    }

    const response = await fetch(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        method: "POST",

        headers: {
          "Authorization": `Bearer ${apiKey}`,
          "Content-Type": "application/json",
          "HTTP-Referer": "https://ultra-ai-ai88.vercel.app",
          "X-Title": "UltraAI"
        },

        body: JSON.stringify({
          model: "openai/gpt-4.1-mini",

          messages: [
            {
              role: "system",
              content:
                "You are UltraAI, a helpful AI assistant. Reply in the same language as the user."
            },
            {
              role: "user",
              content: message
            }
          ],

          max_tokens: 1000
        })
      }
    );

    const text = await response.text();

    let data;

    try {
      data = JSON.parse(text);
    } catch {
      return res.status(502).json({
        error: "AI server ने valid JSON नहीं भेजा।",
        details: text.slice(0, 300)
      });
    }

    if (!response.ok) {
      return res.status(response.status).json({
        error:
          data?.error?.message ||
          "OpenRouter request failed"
      });
    }

    const answer =
      data?.choices?.[0]?.message?.content;

    if (!answer) {
      return res.status(502).json({
        error: "AI response नहीं मिली।"
      });
    }

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
    console.error("UltraAI API Error:", error);

    return res.status(500).json({
      error: error.message || "Server error"
    });
  }
}
