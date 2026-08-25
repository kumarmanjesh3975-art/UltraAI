export default async function handler(req, res) {
    // CORS
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
        "Access-Control-Allow-Methods",
        "POST, OPTIONS"
    );
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Content-Type"
    );

    // Browser preflight
    if (req.method === "OPTIONS") {
        return res.status(200).json({
            success: true
        });
    }

    // Only POST
    if (req.method !== "POST") {
        return res.status(405).json({
            error: "Only POST method is allowed"
        });
    }

    try {
        const { message } = req.body || {};

        if (!message || !message.trim()) {
            return res.status(400).json({
                error: "Message खाली है"
            });
        }

        const apiKey =
            process.env.OPENROUTER_API_KEY;

        if (!apiKey) {
            return res.status(500).json({
                error:
                    "OPENROUTER_API_KEY Vercel Environment Variables में नहीं मिली"
            });
        }

        const response = await fetch(
            "https://openrouter.ai/api/v1/chat/completions",
            {
                method: "POST",

                headers: {
                    "Authorization":
                        "Bearer " + apiKey,

                    "Content-Type":
                        "application/json",

                    "HTTP-Referer":
                        "https://kumarmanjesh3975-art.github.io/UltraAI/",

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
                                "You are UltraAI, a helpful AI assistant. Answer clearly and politely."
                        },
                        {
                            role: "user",
                            content: message
                        }
                    ],

                    max_tokens: 1000,

                    temperature: 0.7
                })
            }
        );

        const raw =
            await response.text();

        let data;

        try {
            data = JSON.parse(raw);
        } catch {
            return res.status(502).json({
                error:
                    "OpenRouter ने valid JSON नहीं भेजा",
                status:
                    response.status
            });
        }

        if (!response.ok) {
            return res.status(response.status).json({
                error:
                    data?.error?.message ||
                    data?.error ||
                    "OpenRouter request failed"
            });
        }

        if (
            !data.choices ||
            !data.choices[0] ||
            !data.choices[0].message
        ) {
            return res.status(502).json({
                error:
                    "AI response नहीं मिली"
            });
        }

        return res.status(200).json(data);

    } catch (error) {

        console.error(
            "UltraAI API Error:",
            error
        );

        return res.status(500).json({
            error:
                "Server Error: " +
                error.message
        });
    }
}
